import { TransactionModel } from "../models/transaction.model";
import { AccountModel } from "../models/account.model";
import { formatTransaction } from "../utils/formatTransaction";

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // --- Fetch current balance directly from Account
    const account = await AccountModel.findOne({ userId }).lean();
    if (!account) return res.status(404).json({ error: "Account not found" });

    const balance = account.balance / 100; // paise → ₹

    // --- Fetch all transactions for this user
    const transactions = await TransactionModel.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .populate("from", "firstName lastName userName")
      .populate("to", "firstName lastName userName")
      .sort({ createdAt: -1 })
      .lean();

    // --- Filter only successful transactions for stats
    const successTxns = transactions.filter((t) => t.status === "success");

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // --- Calculate stats from successful transactions
    const thisMonth = successTxns
      .filter((t) => new Date(t.createdAt) >= startOfMonth)
      .reduce((sum, t) => sum + t.amount / 100, 0);

    const sent = successTxns
      .filter((t) => (t.from?._id?.toString() || t.from?.toString()) === userId)
      .reduce((sum, t) => sum + t.amount / 100, 0);

    const received = successTxns
      .filter(
        (t) =>
          (t.to?._id?.toString() || t.to?.toString()) === userId ||
          t.type === "add"
      )
      .reduce((sum, t) => sum + t.amount / 100, 0);

    // --- Format the first 5 transactions for display
    const recentTransactions = transactions
      .slice(0, 5)
      .map((t) => formatTransaction(t, userId));

    res.json({
      balance,
      previousBalance: 0, // keep as-is
      thisMonth,
      thisMonthChange: 0,
      sent,
      sentChange: 0,
      received,
      receivedChange: 0,
      transactions: transactions.length,
      transactionsChange: 0,
      recentTransactions,
    });
  } catch (err) {
    next(err);
  }
};
