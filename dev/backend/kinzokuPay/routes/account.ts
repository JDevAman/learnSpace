import express from "express";
import mongoose from "mongoose";
import {
  transferSchema,
  addMoneySchema,
  requestMoneySchema,
  paiseToRupees,
} from "../validators/accountValidator";
import throwError from "../utils/error";
import authenticate from "../middlewares/authMiddleware";
import { AccountModel, TransactionModel } from "../db";
import logTransaction from "../utils/logTransaction";
import { getUserIdByEmail } from "../utils/helperFunction";
import { formatTransaction } from "../utils/formatTransaction";

const accountRouter = express.Router();
const EXPIRY_DAYS = Number(process.env.EXPIRY_DAYS) || 5;
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const now = () => new Date();

accountRouter.use(authenticate);

// -------------------- TRANSFER --------------------
accountRouter.post("/transfer", async (req, res, next) => {
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
});

// -------------------- REQUESTS --------------------
accountRouter.get("/requests", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const requests = await TransactionModel.find({
      type: "request",
      $or: [{ to: userId }, { from: userId }],
    })
      .populate("from", "firstName lastName email")
      .populate("to", "firstName lastName email")
      .sort({ createdAt: -1 })
      .lean();

    const formattedRequests = requests.map((t) => formatTransaction(t, userId));
    res.status(200).json(formattedRequests);
  } catch (err) {
    next(err);
  }
});

accountRouter.post("/request", async (req, res, next) => {
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
});

// -------------------- ACCEPT REQUEST --------------------
accountRouter.post("/request/accept/:id", async (req, res, next) => {
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
});

// -------------------- REJECT REQUEST --------------------
accountRouter.post("/request/reject/:id", async (req, res, next) => {
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
});

// -------------------- CANCEL REQUEST --------------------
accountRouter.post("/request/cancel/:id", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tx = await TransactionModel.findById(req.params.id);

    if (!tx) return res.status(404).json({ message: "Request not found" });
    if (tx.type !== "request")
      return res.status(400).json({ message: "Not a request transaction" });
    if (tx.from.toString() !== userId)
      return res.status(403).json({ message: "Not authorized to cancel" });
    if (tx.status !== "pending")
      return res.status(400).json({ message: "Request already processed" });

    tx.status = "rejected";
    tx.finalizedAt = now();
    await tx.save();

    res.status(200).json(formatTransaction(tx, userId));
  } catch (err) {
    next(err);
  }
});

// -------------------- ADD MONEY --------------------
accountRouter.put("/add-money", async (req, res, next) => {
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
});

// -------------------- GET BALANCE --------------------
accountRouter.get("/balance", async (req, res, next) => {
  try {
    const account = await AccountModel.findOne({ userId: req.user.id }).lean();
    if (!account) throwError("Account not found", 404);
    res.status(200).json({ balance: paiseToRupees(account.balance) });
  } catch (err) {
    next(err);
  }
});

export default accountRouter;
