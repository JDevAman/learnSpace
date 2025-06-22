import express from "express";
import { signjwt } from "../utils/tokens";
import config from "../config";
import argon2 from "argon2";
import { UserModel, AccountModel } from "../db";
import throwError from "../utils/error";
import {
    userSignInSchema,
    userSignUpSchema,
    updateUserSchema,
} from "../schema/userValidator";
import authenticate from "../middlewares/authMiddleware";

const userRouter = express.Router();

// ✅ Signup
userRouter.post("/signup", async (req, res) => {
    try {
        const signUpBody = userSignUpSchema.safeParse(req.body);
        if (!signUpBody.success) {
            return res.status(422).json({ message: "Invalid input data!" });
        }

        const parsedObj = signUpBody.data;
        const hashedPw = await argon2.hash(parsedObj.password + config.pepper);

        const user = await UserModel.create({
            ...parsedObj,
            password: hashedPw,
        });

        const userId = user._id;
        // Account also created
        await AccountModel.create({
            userId,
            balance: 0
        })

        return res.status(201).json({ message: "User successfully created" });
    } catch (err) {
        console.error(err);
        throwError("Couldn't Sign Up!", 409);
    }
});

// ✅ Signin
userRouter.post("/signin", async (req, res) => {
    try {
        const signInBody = userSignInSchema.safeParse(req.body);
        if (!signInBody.success) {
            return res.status(422).json({ message: "Invalid credentials!" });
        }

        const parsedObj = signInBody.data;
        const fetchedDetails = await UserModel.findOne({
            userName: parsedObj.userName,
        });

        if (!fetchedDetails) {
            return res.status(401).json({ message: "User not found" });
        }

        const passwordCompare = await argon2.verify(
            fetchedDetails.password,
            parsedObj.password + config.pepper
        );

        if (!passwordCompare) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = signjwt({ userName: fetchedDetails.userName });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 60 * 60 * 1000,
        });

        return res.status(200).json({ message: "Successfully logged in!" });
    } catch (err) {
        console.error(err);
        throwError("Couldn't Sign In!", 409);
    }
});

// ✅ Protected routes
userRouter.use(authenticate);

// ✅ Search users
userRouter.get("/bulk", async (req, res) => {
    const filterParams = req.query.filter as string;

    if (!filterParams) {
        return res.status(400).json({ message: "Missing filter param" });
    }

    const users = await UserModel.find({
        $or: [
            { firstName: { $regex: filterParams, $options: "i" } },
            { lastName: { $regex: filterParams, $options: "i" } },
        ],
    });

    return res.status(200).json({ users });
});

// ✅ Update user profile
userRouter.put("/update-profile", async (req, res) => {
    const updateUserBody = updateUserSchema.safeParse(req.body);

    if (!updateUserBody.success) {
        return res.status(422).json({ message: "Invalid profile data" });
    }

    const updatedDetails = updateUserBody.data;

    await UserModel.updateOne(
        { userName: (req as any).user.userName },
        { $set: updatedDetails }
    );

    return res.status(200).json({ message: "User profile updated" });
});

// ✅ Logout
userRouter.post("/logout", (_req, res) => {
    res.clearCookie("token");
    return res.json({ message: "Logged out" });
});

export default userRouter;
