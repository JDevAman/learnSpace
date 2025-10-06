import express from "express";
import mongoose from "mongoose";
import { TransactionModel } from "../db";
import authenticate from "../middlewares/authMiddleware";

const transactionRouter = express.Router();

// Protect all routes
transactionRouter.use(authenticate);

/**
 * GET /transactions
 * Query params: filter (all|sent|received|pending), search, limit, skip
 * Returns: { transactions: [], total, limit, skip }
 */
transactionRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { filter = "all", search = "", limit = "20", skip = "0" } = req.query;

    const query: any = { $or: [{ from: userId }, { to: userId }] };

    if (filter === "sent") query.from = userId;
    if (filter === "received") query.to = userId;
    if (filter === "pending") query.status = "pending";

    // Handle search by description / sender / recipient
    if (search) {
      const searchRegex = new RegExp(search.toString(), "i");
      query.$or = [
        { ...query.$or[0], description: searchRegex },
        { ...query.$or[0], "from.firstName": searchRegex },
        { ...query.$or[0], "to.firstName": searchRegex },
      ];
    }

    // Total count for infinite scroll
    const total = await TransactionModel.countDocuments(query);

    const transactions = await TransactionModel.find(query)
      .populate("from", "firstName lastName userName")
      .populate("to", "firstName lastName userName")
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const result = transactions.map((t) => {
      const type =
        t.type === "transfer"
          ? t.from._id.toString() === userId
            ? "sent"
            : "received"
          : t.type === "add"
          ? "received"
          : t.type;

      return {
        id: t._id,
        type,
        amount: t.amount / 100,
        description: t.description || "",
        sender: t.from ? `${t.from.firstName} ${t.from.lastName}` : null,
        recipient: t.to ? `${t.to.firstName} ${t.to.lastName}` : null,
        date: t.createdAt,
        status: t.status,
      };
    });

    res.json({
      transactions: result,
      total,
      limit: Number(limit),
      skip: Number(skip),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * GET /transactions/:id
 * Returns a single transaction detail
 */
transactionRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid transaction ID" });

    const transaction = await TransactionModel.findById(id)
      .populate("from", "firstName lastName userName")
      .populate("to", "firstName lastName userName");

    if (!transaction) return res.status(404).json({ error: "Not found" });
    res.json({
      id: transaction._id,
      type: transaction.type,
      amount: transaction.amount / 100,
      description: transaction.description || "",
      sender: transaction.from
        ? `${transaction.from.firstName} ${transaction.from.lastName}`
        : null,
      recipient: transaction.to
        ? `${transaction.to.firstName} ${transaction.to.lastName}`
        : null,
      status: transaction.status,
      date: transaction.createdAt,
      fee: 0,
      total: transaction.amount / 100,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default transactionRouter;
