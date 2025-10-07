import { TransactionModel } from "../db";

async function logTransaction({
  from,
  to,
  amount,
  type,
  description,
  status,
  session,
}) {
  return await TransactionModel.create(
    [{ from, to, amount, type, status, description, timestamp: new Date() }],
    { session }
  );
}

export default logTransaction;
