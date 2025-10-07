import express from "express";
import { TransactionModel } from "../db";
import authenticate from "../middlewares/authMiddleware";
import mongoose from "mongoose";

const dashboardRouter = express.Router();

// Protect all routes
dashboardRouter.use(authenticate);

/**
 * GET /dashboard/stats
 * Returns:
 * {
 *   balance: number,
 *   previousBalance: number,
 *   thisMonth: number,
 *   thisMonthChange: number,
 *   sent: number,
 *   sentChange: number,
 *   received: number,
 *   receivedChange: number,
 *   transactions: number,
 *   transactionsChange: number,
 *   recentTransactions: Array
 * }
 */
dashboardRouter.get("/stats", async (req, res) => {
  try {
    const userId = req.user.id;

    // --- Fetch all user-related transactions
    const transactions = await TransactionModel.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .populate("from", "firstName lastName")
      .populate("to", "firstName lastName")
      .sort({ createdAt: -1 });

    // --- Helper to safely get amount in units
    const amount = (t: any) => (t.amount ? t.amount / 100 : 0);

    // --- Compute current balance
    let balance = 0;
    transactions.forEach((t: any) => {
      if (t.type === "transfer") {
        balance += t.to?._id?.toString() === userId ? amount(t) : -amount(t);
      } else if (t.type === "add") {
        balance += amount(t);
      } else if (t.type === "withdraw") {
        balance -= amount(t);
      }
    });

    // --- Compute previous month balance
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    let previousBalance = 0;
    transactions.forEach((t: any) => {
      if (t.createdAt < startOfMonth) {
        if (t.type === "transfer") {
          previousBalance +=
            t.to?._id?.toString() === userId ? amount(t) : -amount(t);
        } else if (t.type === "add") {
          previousBalance += amount(t);
        } else if (t.type === "withdraw") {
          previousBalance -= amount(t);
        }
      }
    });

    // --- Recent 5 transactions
    const recentTransactions = transactions.slice(0, 5).map((t: any) => {
      const type =
        t.type === "transfer"
          ? t.from?._id?.toString() === userId
            ? "sent"
            : "received"
          : t.type === "add"
          ? "received"
          : t.type;

      return {
        id: t._id,
        type,
        amount: amount(t),
        description: t.description || "",
        sender: t.from ? `${t.from.firstName} ${t.from.lastName}` : null,
        recipient: t.to ? `${t.to.firstName} ${t.to.lastName}` : null,
        date: t.createdAt,
        status: t.status,
      };
    });

    res.json({
      balance,
      previousBalance,
      thisMonth: transactions
        .filter((t) => t.createdAt >= startOfMonth)
        .reduce((sum, t) => sum + amount(t), 0),
      thisMonthChange: 0, // frontend can calculate ((thisMonth - previousMonth)/previousMonth*100)
      sent: transactions
        .filter((t) => t.from?._id?.toString() === userId)
        .reduce((sum, t) => sum + amount(t), 0),
      sentChange: 0,
      received: transactions
        .filter((t) => t.to?._id?.toString() === userId || t.type === "add")
        .reduce((sum, t) => sum + amount(t), 0),
      receivedChange: 0,
      transactions: transactions.length,
      transactionsChange: 0,
      recentTransactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default dashboardRouter;
