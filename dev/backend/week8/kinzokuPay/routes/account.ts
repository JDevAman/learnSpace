import express from "express";
import {
    transferSchema,
    addMoneySchema,
    requestMoneySchema
} from "../schema/accountValidator";
import throwError from "../utils/error";
import authenticate from "../middlewares/authMiddleware";
import mongoose from "mongoose";
import { AccountModel } from "../db";
import logTransaction from "../utils/logTransaction";

const accountRouter = express.Router();

const EXPIRY_DAYS = 5;
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const now = () => new Date();

// ACID Transaction for transfer money
accountRouter.post("/transfer", authenticate, async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        const transferBody = transferSchema.safeParse(req.body);
        if (!transferBody.success) {
            console.error("Validation Error:", transferBody.error.format());
            throwError("Invalid input data!", 422);
        }

        console.log(transferBody.data);
        const from = req.user.id;
        const { to, amount } = transferBody.data;

        if (from === to) throwError("Cannot transfer to yourself", 400);

        session.startTransaction();

        const sender = await AccountModel.findOne({ userId: from }).session(session);
        const receiver = await AccountModel.findOne({ userId: to }).session(session);

        if (!sender || !receiver) throwError("Account not found", 404);
        if (sender.balance < amount) throwError("Insufficient balance", 400);

        await AccountModel.updateOne({ userId: from }, { $inc: { balance: -amount } }).session(session);
        await AccountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await logTransaction({ from, to, amount, type: "transfer", status: "success", session });

        await session.commitTransaction();

        res.status(200).json({ message: "Transfer successful", amount });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
});

// Request money (creates pending transaction)
accountRouter.post("/request", authenticate, async (req, res, next) => {
    try {
        const requestBody = requestMoneySchema.safeParse(req.body);
        if (!requestBody.success) {
            console.error("Validation Error:", requestBody.error.format());
            throwError("Invalid input data!", 422);
        }

        const from = req.user.id;
        const { to, amount } = requestBody.data;

        if (from === to) throwError("Cannot request money from yourself", 400);

        const fromAccount = await AccountModel.findOne({ userId: from }).lean();
        const toAccount = await AccountModel.findOne({ userId: to }).lean();
        if (!fromAccount || !toAccount) throwError("Account not found", 404);

        const expiresAt = new Date(Date.now() + EXPIRY_DAYS * MS_IN_DAY);

        const transaction = await logTransaction({
            from,
            to,
            amount,
            type: "request",
            status: "pending",
            session: null // not in transaction block
        });

        transaction.expiresAt = expiresAt;
        await transaction.save();

        res.status(200).json({
            message: "Money request sent",
            amount,
            requestId: transaction._id,
            expiresAt
        });
    } catch (err) {
        next(err);
    }
});

// Accept money request
accountRouter.post("/request/accept/:id", authenticate, async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        const userId = req.user.id;
        const transaction = await mongoose.model("Transaction").findById(req.params.id).session(session);

        if (!transaction || transaction.status !== "pending") throwError("Invalid transaction", 400);
        if (transaction.to.toString() !== userId) throwError("Unauthorized", 403);
        if (transaction.expiresAt && transaction.expiresAt < now()) throwError("Request expired", 400);

        session.startTransaction();

        const fromAccount = await AccountModel.findOne({ userId: transaction.from }).session(session);
        const toAccount = await AccountModel.findOne({ userId: transaction.to }).session(session);

        if (!fromAccount || !toAccount) throwError("Account not found", 404);
        if (toAccount.balance < transaction.amount) throwError("Insufficient balance", 400);

        await AccountModel.updateOne({ userId: transaction.to }, { $inc: { balance: -transaction.amount } }).session(session);
        await AccountModel.updateOne({ userId: transaction.from }, { $inc: { balance: transaction.amount } }).session(session);

        transaction.status = "completed";
        transaction.completedAt = now();
        await transaction.save({ session });

        await session.commitTransaction();
        res.status(200).json({ message: "Request accepted and money transferred" });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
});

// Reject money request
accountRouter.post("/request/reject/:id", authenticate, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const transaction = await mongoose.model("Transaction").findById(req.params.id);

        if (!transaction || transaction.status !== "pending") throwError("Invalid transaction", 400);
        if (transaction.to.toString() !== userId) throwError("Unauthorized", 403);
        if (transaction.expiresAt && transaction.expiresAt < now()) throwError("Request expired", 400);

        transaction.status = "rejected";
        transaction.rejectedAt = now();
        await transaction.save();

        res.status(200).json({ message: "Money request rejected" });
    } catch (err) {
        next(err);
    }
});

// Get balance
accountRouter.get("/balance", authenticate, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const account = await AccountModel.findOne({ userId }).lean();
        if (!account) throwError("Account not found", 404);

        res.status(200).json({ balance: account.balance });
    } catch (err) {
        next(err);
    }
});

// Add money
accountRouter.put("/add-money", authenticate, async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        console.log(req.body);
        const body = addMoneySchema.safeParse(req.body);
        if (!body.success) {
            console.error("Validation Error:", body.error.format());
            throwError("Invalid input data!", 422);
        }

        const userId = req.user.id;
        const { amount } = body.data;

        session.startTransaction();

        const account = await AccountModel.findOne({ userId }).session(session);
        if (!account) throwError("Account not found", 404);

        await AccountModel.updateOne({ userId }, { $inc: { balance: amount } }).session(session);

        await logTransaction({ from: null, to: userId, amount, type: "add", status: "success", session });

        await session.commitTransaction();
        res.status(200).json({ message: "Money added", amount });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
});

export default accountRouter;
