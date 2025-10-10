import argon2 from "argon2";
import { UserModel } from "../models/user.model";
import { AccountModel } from "../models/account.model";
import { signjwt } from "../utils/tokens";
import config from "../config";
import throwError from "../utils/helperFunction";
import {
  userSignInSchema,
  userSignUpSchema,
  updateUserSchema,
} from "../validators/userValidator";

// ✅ Signup
export const signUp = async (req, res) => {
  try {
    const signUpBody = userSignUpSchema.safeParse(req.body);
    if (!signUpBody.success)
      return res.status(422).json({ message: "Invalid input data!" });

    const { firstName, lastName, userName, password } = signUpBody.data;

    if (await UserModel.findOne({ userName }))
      return res.status(409).json({ message: "User already exists!" });

    const hashedPw = await argon2.hash(password + config.pepper);
    const user = await UserModel.create({
      firstName,
      lastName,
      userName,
      password: hashedPw,
    });

    if (!(await AccountModel.findOne({ userId: user._id })))
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
};

// ✅ Signin
export const signIn = async (req, res) => {
  try {
    const signInBody = userSignInSchema.safeParse(req.body);
    if (!signInBody.success)
      return res.status(422).json({ message: "Invalid credentials!" });

    const { userName, password } = signInBody.data;
    const user = await UserModel.findOne({ userName });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isValid = await argon2.verify(
      user.password,
      password + config.pepper
    );
    if (!isValid)
      return res.status(401).json({ message: "Incorrect password" });

    const token = signjwt({
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.userName,
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
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.userName,
      },
    });
  } catch (err) {
    console.error(err);
    throwError("Couldn't Sign In!", 500);
  }
};

// ✅ Protected route: current user
export const getMe = (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Not logged in" });
  return res.status(200).json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
    },
  });
};

// ✅ Logout
export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
};

// ✅ Update profile
export const updateProfile = async (req, res) => {
  try {
    const updateBody = updateUserSchema.safeParse(req.body);
    if (!updateBody.success)
      return res.status(422).json({ message: "Invalid profile data" });

    const { firstName, lastName, email, password } = updateBody.data;
    const currentUser = req.user;

    if (email && email !== currentUser.email) {
      if (await UserModel.findOne({ userName: email }))
        return res.status(409).json({ message: "Email already in use" });
    }

    const updatedFields: any = {};
    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;
    if (email) updatedFields.userName = email;
    if (password)
      updatedFields.password = await argon2.hash(password + config.pepper);

    await UserModel.updateOne({ _id: currentUser.id }, { $set: updatedFields });

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
  } catch (err) {
    console.error(err);
    throwError("Couldn't update profile!", 500);
  }
};

// ✅ Bulk search users
export const bulkSearch = async (req, res) => {
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
};
