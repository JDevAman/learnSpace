import express from "express";
import authenticate from "../middlewares/authMiddleware";
import {
  signUp,
  signIn,
  getMe,
  logout,
  updateProfile,
  bulkSearch,
} from "../controllers/user.controller";

const userRouter = express.Router();

// Public routes
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);

// Protected routes
userRouter.use(authenticate);
userRouter.get("/me", getMe);
userRouter.post("/logout", logout);
userRouter.put("/update-profile", updateProfile);
userRouter.get("/bulk", bulkSearch);

export default userRouter;
