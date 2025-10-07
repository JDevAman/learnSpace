import mongoose from "mongoose";
import config from "./config";

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

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
    firstName: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: function (): boolean {
        return !this.oauthProvider;
      },
    },
    avatar: {
      type: String, // profile picture URL
      default: null,
    },
    oauthProvider: {
      type: String, // 'google', 'github', or undefined
      enum: ["google", "github"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Account schema - stores balance in paise (smallest currency unit)
const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensure one account per user
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0, // Prevent negative balances
    },
  },
  {
    timestamps: true,
  }
);

// Enhanced transaction schema
const transactionSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        // 'from' is required for all types except 'add' (system deposits)
        return this.type !== "add";
      },
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1, // Minimum 1 paisa
    },
    type: {
      type: String,
      enum: ["transfer", "request", "add"], // Added 'add' for add-money operations
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"], // Added 'success' for direct transfers
      default: "pending",
    },
    description: {
      type: String, // Added 'success' for direct transfers
      default: "null",
    },
    // For money requests - expiration time
    expiresAt: {
      type: Date,
      required: function () {
        return this.type === "request" && this.status === "pending";
      },
    },
    // Additional timestamps for better tracking
    completedAt: {
      type: Date,
      required: function () {
        return this.status === "completed";
      },
    },
    rejectedAt: {
      type: Date,
      required: function () {
        return this.status === "rejected";
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
transactionSchema.index({ from: 1 });
transactionSchema.index({ to: 1 });
transactionSchema.index({ type: 1, status: 1 });
transactionSchema.index({ createdAt: -1 }); // For transaction history sorting

// Middleware to automatically create account when user is created
userSchema.post("save", async function (doc) {
  try {
    // Check if account already exists
    const existingAccount = await AccountModel.findOne({ userId: doc._id });
    if (!existingAccount) {
      await AccountModel.create({
        userId: doc._id,
        balance: 0,
      });
      console.log(`✅ Account created for user: ${doc.userName}`);
    }
  } catch (error) {
    console.error("❌ Error creating account:", error);
  }
});

// Virtual for user's full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Method to convert balance from paise to rupees for display
accountSchema.methods.getBalanceInRupees = function () {
  return this.balance / 100;
};

// Static method to find user by username
userSchema.statics.findByUsername = function (username) {
  return this.findOne({ userName: username.toLowerCase() });
};

// Collection names are automatically pluralized by Mongoose
const UserModel = mongoose.model("User", userSchema);
const AccountModel = mongoose.model("Account", accountSchema);
const TransactionModel = mongoose.model("Transaction", transactionSchema);

export { UserModel, AccountModel, TransactionModel };
