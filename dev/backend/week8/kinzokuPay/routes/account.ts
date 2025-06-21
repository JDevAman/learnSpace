import express from "express";
import { balanceSchema, transferSchema } from "../schema/accountValidator";
import throwError from "../middlewares/error";
import authenticate from "../middlewares/authMiddleware";
import mongoose from "mongoose";
import { AccountModel } from "../db";

const accountRouter = express.Router();

// ACID Transaction for transfer money
accountRouter.post("/transfer", authenticate, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const transferBody = transferSchema.safeParse(req.body);
        if (!transferBody.success) {
            return res.status(422).json({ message: "Invalid input data!" });
        }
        const { from, to, amount } = transferBody.data;
        // Start Transaction
        session.startTransaction();
        const senderAccount = await AccountModel.findOne({ userId: from }).session(session);
        const receiverAccount = await AccountModel.findOne({ userId: to }).session(session);

        if (!senderAccount || !receiverAccount) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Account not found" });
        }

        if (senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }


        await senderAccount.updateOne({ userId: from }, {
            $dec: { balance: amount }
        }).session(session);
        await receiverAccount.updateOne({ userId: to }, {
            $inc: { balance: amount }
        }).session(session);

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: "Transfer successful" });

    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transfer Failed", err);
        throwError("Couldn't Transfer Money!", 511);
    }
})

accountRouter.get("/balance", authenticate, async (req, res) => {
    try {
        const balanceBody = balanceSchema.safeParse(req.body);
        console.log(req.body)
        if (!balanceBody.success) {
            return res.status(422).json({ message: "Invalid input data!" });
        }
        const userData = await AccountModel.findOne({ userId: balanceBody.data.from });
        return res.status(200).json({ data: userData?.balance });
    }
    catch (err) {
        console.error("Balance Check Failed", err);
        throwError("Couldn't Check Balance!", 511);
    }
})

export default accountRouter;