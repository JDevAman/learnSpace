import { TransactionModel } from "../db";
import mongoose from "mongoose";

interface LogTransactionParams {
  from: mongoose.Types.ObjectId | null;
  to: mongoose.Types.ObjectId;
  amount: number;
  type: "transfer" | "request" | "add";
  description?: string | null;
  status?: "pending" | "success" | "rejected" | "failed";
  session?: mongoose.ClientSession | null;
  expiresAt?: Date | null;
}

export default async function logTransaction({
  from,
  to,
  amount,
  type,
  description = null,
  status = "pending",
  session = null,
  expiresAt = null,
}: LogTransactionParams) {
  const transaction = new TransactionModel({
    from,
    to,
    amount,
    type,
    description,
    status,
    expiresAt,
  });

  await transaction.save({ session });
  return transaction;
}
