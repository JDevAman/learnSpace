import { TransactionModel } from "../db";
import { formatTransaction } from "../utils/formatTransaction";

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const transactions = await TransactionModel.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .populate("from", "firstName lastName userName")
      .populate("to", "firstName lastName userName")
      .sort({ createdAt: -1 })
      .lean();

    const amount = (t: any) => (t.amount ? t.amount / 100 : 0);

    let balance = 0;
    let previousBalance = 0;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    transactions.forEach((t: any) => {
      const val =
        t.type === "transfer"
          ? t.to?._id.toString() === userId
            ? amount(t)
            : -amount(t)
          : amount(t);

      balance += val;

      if (t.createdAt < startOfMonth) {
        previousBalance += val;
      }
    });

    const recentTransactions = await Promise.all(
      transactions.slice(0, 5).map((t) => formatTransaction(t, userId))
    );

    res.json({
      balance,
      previousBalance,
      thisMonth: transactions
        .filter((t) => t.createdAt >= startOfMonth)
        .reduce((sum, t) => sum + amount(t), 0),
      thisMonthChange: 0,
      sent: transactions
        .filter((t) => t.from?._id.toString() === userId)
        .reduce((sum, t) => sum + amount(t), 0),
      sentChange: 0,
      received: transactions
        .filter((t) => t.to?._id.toString() === userId || t.type === "add")
        .reduce((sum, t) => sum + amount(t), 0),
      receivedChange: 0,
      transactions: transactions.length,
      transactionsChange: 0,
      recentTransactions,
    });
  } catch (err) {
    next(err);
  }
};
