import mongoose from "mongoose";
import { TransactionModel } from "../models/transaction.model";
import { Parser } from "json2csv";
import { formatTransaction } from "../utils/formatTransaction";

// ✅ List transactions
export const listTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { filter = "all", search = "", limit = "20", skip = "0" } = req.query;

    const query: any = { $or: [{ from: userId }, { to: userId }] };
    if (filter === "sent") query.from = userId;
    if (filter === "received") query.to = userId;
    if (filter === "pending") query.status = "pending";

    const total = await TransactionModel.countDocuments(query);

    const transactions = await TransactionModel.find(query)
      .populate("from", "firstName lastName userName")
      .populate("to", "firstName lastName userName")
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const result = transactions.map((t) => formatTransaction(t, userId));

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
};

// ✅ Get single transaction
export const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid transaction ID" });

    const t = await TransactionModel.findById(id)
      .populate("from", "firstName lastName userName")
      .populate("to", "firstName lastName userName");

    if (!t) return res.status(404).json({ error: "Transaction not found" });

    res.json(formatTransaction(t, req.user.id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Export transactions as CSV
export const exportTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await TransactionModel.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .populate("from", "firstName lastName userName")
      .populate("to", "firstName lastName userName")
      .sort({ createdAt: -1 });

    const exportData = transactions.map((t) => formatTransaction(t, userId));
    const parser = new Parser();
    const csv = parser.parse(exportData);

    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to export transactions" });
  }
};
