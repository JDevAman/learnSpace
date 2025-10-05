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
    if (!signUpBody.success)
      return res.status(422).json({ message: "Invalid input data!" });

    const { firstName, lastName, userName, password } = signUpBody.data;

    const existingUser = await UserModel.findOne({ userName });
    if (existingUser)
      return res.status(409).json({ message: "User already exists!" });

    const hashedPw = await argon2.hash(password + config.pepper);
    const user = await UserModel.create({
      firstName,
      lastName,
      userName,
      password: hashedPw,
    });

    const existingAccount = await AccountModel.findOne({ userId: user._id });
    if (!existingAccount)
      await AccountModel.create({ userId: user._id, balance: 0 });

    const token = signjwt({
      id: user._id.toString(),
      firstName,
      lastName,
      email: userName,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User successfully created",
      user: { id: user._id.toString(), firstName, lastName, email: userName },
    });
  } catch (err) {
    console.error(err);
    throwError("Couldn't Sign Up!", 500);
  }
});

// ✅ Signin
userRouter.post("/signin", async (req, res) => {
  try {
    const signInBody = userSignInSchema.safeParse(req.body);
    if (!signInBody.success)
      return res.status(422).json({ message: "Invalid credentials!" });

    const { userName, password } = signInBody.data;
    const fetchedUser = await UserModel.findOne({ userName });
    if (!fetchedUser)
      return res.status(401).json({ message: "User not found" });

    const isValid = await argon2.verify(
      fetchedUser.password,
      password + config.pepper
    );
    if (!isValid)
      return res.status(401).json({ message: "Incorrect password" });

    const token = signjwt({
      id: fetchedUser._id.toString(),
      firstName: fetchedUser.firstName,
      lastName: fetchedUser.lastName,
      email: fetchedUser.userName,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Successfully logged in!",
      user: {
        id: fetchedUser._id.toString(),
        firstName: fetchedUser.firstName,
        lastName: fetchedUser.lastName,
        email: fetchedUser.userName,
      },
    });
  } catch (err) {
    console.error(err);
    throwError("Couldn't Sign In!", 500);
  }
});

// ✅ Protected routes
userRouter.use(authenticate);

// ✅ Search users
userRouter.get("/bulk", async (req, res) => {
  const filterParams = req.query.filter as string;
  if (!filterParams)
    return res.status(400).json({ message: "Missing filter param" });

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
  const updateBody = updateUserSchema.safeParse(req.body);
  if (!updateBody.success)
    return res.status(422).json({ message: "Invalid profile data" });

  const { firstName, lastName, email, password } = updateBody.data;
  const currentUser = (req as any).user;

  // Check if email is changing and already exists
  if (email && email !== currentUser.email) {
    const emailExists = await UserModel.findOne({ userName: email });
    if (emailExists)
      return res.status(409).json({ message: "Email already in use" });
  }

  const updatedFields: any = {};
  if (firstName) updatedFields.firstName = firstName;
  if (lastName) updatedFields.lastName = lastName;
  if (email) updatedFields.userName = email;
  if (password)
    updatedFields.password = await argon2.hash(password + config.pepper);

  await UserModel.updateOne({ _id: currentUser.id }, { $set: updatedFields });

  // Issue new token if email or name changed
  const token = signjwt({
    id: currentUser.id,
    firstName: updatedFields.firstName ?? currentUser.firstName,
    lastName: updatedFields.lastName ?? currentUser.lastName,
    email: updatedFields.userName ?? currentUser.email,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: 60 * 60 * 1000,
  });

  return res.status(200).json({ message: "User profile updated" });
});

// ✅ Logout
userRouter.post("/logout", async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
});

// ✅ Current user
userRouter.get("/me", (req, res) => {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ message: "Not logged in" });
  return res.status(200).json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar
    },
  });
});

export default userRouter;
