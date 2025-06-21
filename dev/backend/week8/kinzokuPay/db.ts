import mongoose, { mongo } from "mongoose";
import config from './config';

mongoose.connect(config.mongoURI).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

const userSchema = new mongoose.Schema({
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
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, {
    timestamps: true,
});

// Store - 8888 and show in frontend as decimal
// create references to user Table. Foreign key
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // ref to user Model and objId
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

// collection name is 3rd parameter for mongoose model.
const UserModel = mongoose.model("User", userSchema);
const AccountModel = mongoose.model("Account", accountSchema);
export { UserModel, AccountModel };
