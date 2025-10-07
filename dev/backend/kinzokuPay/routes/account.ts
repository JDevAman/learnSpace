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
import { AccountModel } from "../db";
import logTransaction from "../utils/logTransaction";
import { getUserIdByEmail } from "../utils/helperFunction";

const accountRouter = express.Router();

const EXPIRY_DAYS = 5;
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const now = () => new Date();

// ---------- TRANSFER MONEY ----------
accountRouter.post("/transfer", authenticate, async (req, res, next) => {
  const session = await mongoose.startSession();
  let transactionStarted = false;

  try {
    const parsed = transferSchema.safeParse(req.body);
    if (!parsed.success) throwError("Invalid input data!", 422);

    const from = req.user.id;
    const { recipient, amount, description } = parsed.data;

    const to = await getUserIdByEmail(recipient);
    if (from === to.toString()) throwError("Cannot transfer to yourself", 400);

    session.startTransaction();
    transactionStarted = true;

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

    await logTransaction({
      from,
      to,
      amount,
      type: "transfer",
      status: "success",
      description,
      session,
    });

    await session.commitTransaction();

    res
      .status(200)
      .json({ message: "Transfer successful", amount: paiseToRupees(amount) });
  } catch (err) {
    if (transactionStarted) await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
});

// ---------- REQUEST MONEY ----------
accountRouter.post("/request", authenticate, async (req, res, next) => {
  try {
    const parsed = requestMoneySchema.safeParse(req.body);
    if (!parsed.success) throwError("Invalid input data!", 422);

    const from = req.user.id;
    const { recipient, amount, description } = parsed.data; // amount in paise
    const to = await getUserIdByEmail(recipient);

    if (from === to.toString())
      throwError("Cannot request money from yourself", 400);

    const fromAccount = await AccountModel.findOne({ userId: from }).lean();
    const toAccount = await AccountModel.findOne({ userId: to }).lean();
    if (!fromAccount || !toAccount) throwError("Account not found", 404);

    const expiresAt = new Date(Date.now() + EXPIRY_DAYS * MS_IN_DAY);

    const transaction = await logTransaction({
      from,
      to,
      amount,
      description,
      type: "request",
      status: "pending",
      session: null,
    });

    transaction.expiresAt = expiresAt;
    await transaction.save();

    res.status(200).json({
      message: "Money request sent",
      amount: paiseToRupees(amount),
      requestId: transaction._id,
      expiresAt,
    });
  } catch (err) {
    next(err);
  }
});

// ---------- ACCEPT REQUEST ----------
accountRouter.post(
  "/request/accept/:id",
  authenticate,
  async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
      const userId = req.user.id;
      const transaction = await mongoose
        .model("Transaction")
        .findById(req.params.id)
        .session(session);

      if (!transaction || transaction.status !== "pending")
        throwError("Invalid transaction", 400);
      if (transaction.to.toString() !== userId) throwError("Unauthorized", 403);
      if (transaction.expiresAt && transaction.expiresAt < now())
        throwError("Request expired", 400);

      session.startTransaction();

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

      transaction.status = "completed";
      transaction.completedAt = now();
      await transaction.save({ session });

      await session.commitTransaction();
      res.status(200).json({
        message: "Request accepted and money transferred",
        amount: paiseToRupees(transaction.amount),
      });
    } catch (err) {
      await session.abortTransaction();
      next(err);
    } finally {
      session.endSession();
    }
  }
);

// ---------- REJECT REQUEST ----------
accountRouter.post(
  "/request/reject/:id",
  authenticate,
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const transaction = await mongoose
        .model("Transaction")
        .findById(req.params.id);

      if (!transaction || transaction.status !== "pending")
        throwError("Invalid transaction", 400);
      if (transaction.to.toString() !== userId) throwError("Unauthorized", 403);
      if (transaction.expiresAt && transaction.expiresAt < now())
        throwError("Request expired", 400);

      transaction.status = "rejected";
      transaction.rejectedAt = now();
      await transaction.save();

      res.status(200).json({ message: "Money request rejected" });
    } catch (err) {
      next(err);
    }
  }
);

// ---------- GET BALANCE ----------
accountRouter.get("/balance", authenticate, async (req, res, next) => {
  try {
    const account = await AccountModel.findOne({ userId: req.user.id }).lean();
    if (!account) throwError("Account not found", 404);

    res.status(200).json({ balance: paiseToRupees(account.balance) });
  } catch (err) {
    next(err);
  }
});

// ---------- ADD MONEY ----------
accountRouter.put("/add-money", authenticate, async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const parsed = addMoneySchema.safeParse(req.body);
    if (!parsed.success) throwError("Invalid input data!", 422);

    const userId = req.user.id;
    const { amount } = parsed.data; // in paise

    session.startTransaction();

    const account = await AccountModel.findOne({ userId }).session(session);
    if (!account) throwError("Account not found", 404);

    await AccountModel.updateOne(
      { userId },
      { $inc: { balance: amount } }
    ).session(session);

    await logTransaction({
      from: null,
      to: userId,
      amount,
      description: "Added Money",
      type: "add",
      status: "success",
      session,
    });

    await session.commitTransaction();
    res
      .status(200)
      .json({ message: "Money added", amount: paiseToRupees(amount) });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
});

export default accountRouter;
