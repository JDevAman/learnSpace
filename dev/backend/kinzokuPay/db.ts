import mongoose from "mongoose";
import config from "./config";

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ----------------- User Schema -----------------
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true,
      unique: true,
      trim: true,
    },
    firstName: { type: String, required: true, maxlength: 20, trim: true },
    lastName: { type: String, required: true, maxlength: 20, trim: true },
    password: {
      type: String,
      minlength: 6,
      required: function (): boolean {
        return !this.oauthProvider;
      },
    },
    avatar: { type: String, default: null },
    oauthProvider: {
      type: String,
      enum: ["google", "github"],
      default: null,
    },
  },
  { timestamps: true }
);

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Static method to find user by username
userSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ userName: username.toLowerCase() });
};

// ----------------- Account Schema -----------------
const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true }
);

accountSchema.methods.getBalanceInRupees = function () {
  return this.balance / 100;
};

// ----------------- Transaction Schema -----------------
const transactionSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.type !== "add";
      },
    },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 1 },
    type: {
      type: String,
      enum: ["transfer", "request", "add"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "success",
        "failed",
        "rejected",
        "cancelled",
      ],
      default: "pending",
    },
    description: { type: String, default: null },
    expiresAt: { type: Date, default: undefined }, // only for requests
    finalizedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Indexes for performance
transactionSchema.index({ from: 1 });
transactionSchema.index({ to: 1 });
transactionSchema.index({ type: 1, status: 1 });
transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Middleware to auto-create account
userSchema.post("save", async function (doc) {
  try {
    const existing = await AccountModel.findOne({ userId: doc._id });
    if (!existing) await AccountModel.create({ userId: doc._id, balance: 0 });
  } catch (err) {
    console.error("❌ Error creating account:", err);
  }
});

export const UserModel = mongoose.model("User", userSchema);
export const AccountModel = mongoose.model("Account", accountSchema);
export const TransactionModel = mongoose.model(
  "Transaction",
  transactionSchema
);
