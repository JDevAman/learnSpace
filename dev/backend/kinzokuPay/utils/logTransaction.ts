import { TransactionModel } from "../db";

async function logTransaction({ from, to, amount, type, status, session }) {
    return await TransactionModel.create([{ from, to, amount, type, status, timestamp: new Date() }], { session });
}

export default logTransaction;