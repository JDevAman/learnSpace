import mongoose from "mongoose";
import throwError from "../utils/helperFunction";
import { TransactionModel } from "../models/transaction.model";
import { AccountModel } from "../models/account.model";
import logTransaction from "../utils/logTransaction";
import { getUserIdByEmail } from "../utils/helperFunction";
import { formatTransaction } from "../utils/formatTransaction";
import {
  transferSchema,
  addMoneySchema,
  requestMoneySchema,
} from "../validators/accountValidator";

const EXPIRY_DAYS = Number(process.env.EXPIRY_DAYS) || 5;
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const now = () => new Date();

// -------------------- TRANSFER --------------------
export const transferMoney = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const parsed = transferSchema.safeParse(req.body);
    if (!parsed.success) throwError("Invalid input data!", 422);

    const from = req.user.id;
    const { recipient, amount, note } = parsed.data;
    const to = await getUserIdByEmail(recipient);

    if (from === to.toString()) throwError("Cannot transfer to yourself", 400);

    session.startTransaction();

    const sender = await AccountModel.findOne({ userId: from }).session(
      session
    );
    const receiver = await AccountModel.findOne({ userId: to }).session(
      session
    );
    if (!sender || !receiver) throwError("Account not found", 404);
    if (sender.balance < amount) throwError("Insufficient balance", 400);

    await AccountModel.updateOne(
      { userId: from },
      { $inc: { balance: -amount } }
    ).session(session);
    await AccountModel.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    const transaction = await logTransaction({
      from,
      to,
      amount,
      type: "transfer",
      status: "success",
      description: note,
      session,
    });

    await session.commitTransaction();
    res.status(200).json(formatTransaction(transaction, from));
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

// -------------------- REQUEST MONEY --------------------
export const getRequests = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const requests = await TransactionModel.find({
      type: "request",
      $or: [{ to: userId }, { from: userId }],
    })
      .populate("from", "firstName lastName userName")
      .populate("to", "firstName lastName userName")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(requests.map((t) => formatTransaction(t, userId)));
  } catch (err) {
    next(err);
  }
};

export const createRequest = async (req, res, next) => {
  try {
    const parsed = requestMoneySchema.safeParse(req.body);
    if (!parsed.success) throwError("Invalid input data!", 422);

    const from = req.user.id;
    const { recipient, amount, note } = parsed.data;
    const to = await getUserIdByEmail(recipient);

    if (from === to.toString())
      throwError("Cannot request money from yourself", 400);

    const expiresAt = new Date(Date.now() + EXPIRY_DAYS * MS_IN_DAY);
    const transaction = await logTransaction({
      from,
      to,
      amount,
      type: "request",
      status: "pending",
      description: note,
      expiresAt,
    });

    res.status(200).json(formatTransaction(transaction, from));
  } catch (err) {
    next(err);
  }
};

export const acceptRequest = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const transaction = await TransactionModel.findById(req.params.id).session(
      session
    );
    if (!transaction || transaction.status !== "pending")
      throwError("Invalid transaction", 400);
    if (transaction.to.toString() !== req.user.id)
      throwError("Unauthorized", 403);
    if (transaction.expiresAt && transaction.expiresAt < now())
      throwError("Request expired", 400);

    const fromAccount = await AccountModel.findOne({
      userId: transaction.from,
    }).session(session);
    const toAccount = await AccountModel.findOne({
      userId: transaction.to,
    }).session(session);
    if (!fromAccount || !toAccount) throwError("Account not found", 404);
    if (toAccount.balance < transaction.amount)
      throwError("Insufficient balance", 400);

    await AccountModel.updateOne(
      { userId: transaction.to },
      { $inc: { balance: -transaction.amount } }
    ).session(session);
    await AccountModel.updateOne(
      { userId: transaction.from },
      { $inc: { balance: transaction.amount } }
    ).session(session);

    transaction.status = "success";
    transaction.finalizedAt = now();
    await transaction.save({ session });

    await session.commitTransaction();
    res
      .status(200)
      .json(formatTransaction(transaction, transaction.from.toString()));
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

export const rejectRequest = async (req, res, next) => {
  try {
    const transaction = await TransactionModel.findById(req.params.id);
    if (!transaction || transaction.status !== "pending")
      throwError("Invalid transaction", 400);
    if (transaction.to.toString() !== req.user.id)
      throwError("Unauthorized", 403);
    if (transaction.expiresAt && transaction.expiresAt < now())
      throwError("Request expired", 400);

    transaction.status = "rejected";
    transaction.finalizedAt = now();
    await transaction.save();

    res.status(200).json(formatTransaction(transaction, req.user.id));
  } catch (err) {
    next(err);
  }
};

export const cancelRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tx = await TransactionModel.findById(req.params.id);
    if (!tx) return throwError("Request not found", 404);
    if (tx.type !== "request") throwError("Not a request transaction", 400);
    if (tx.from.toString() !== userId)
      throwError("Not authorized to cancel", 403);
    if (tx.status !== "pending") throwError("Request already processed", 400);

    tx.status = "rejected";
    tx.finalizedAt = now();
    await tx.save();

    res.status(200).json(formatTransaction(tx, userId));
  } catch (err) {
    next(err);
  }
};

// -------------------- ADD MONEY --------------------
export const addMoney = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const parsed = addMoneySchema.safeParse(req.body);
    if (!parsed.success) throwError("Invalid input data!", 422);

    const userId = req.user.id;
    const { amount } = parsed.data;

    session.startTransaction();
    await AccountModel.updateOne(
      { userId },
      { $inc: { balance: amount } }
    ).session(session);

    const transaction = await logTransaction({
      from: null,
      to: userId,
      amount,
      type: "add",
      status: "success",
      description: "Added Money",
      session,
    });

    await session.commitTransaction();
    res.status(200).json(formatTransaction(transaction, userId));
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

// -------------------- GET BALANCE --------------------
export const getBalance = async (req, res, next) => {
  try {
    const account = await AccountModel.findOne({ userId: req.user.id }).lean();
    if (!account) throwError("Account not found", 404);
    res.status(200).json({ balance: account.balance / 100 });
  } catch (err) {
    next(err);
  }
};
