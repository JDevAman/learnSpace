import express from "express";
import {
  googleRedirect,
  googleCallback,
  githubRedirect,
  githubCallback,
} from "../controllers/auth.controller";

const authRouter = express.Router();

// Google OAuth
authRouter.get("/google", googleRedirect);
authRouter.get("/google/callback", googleCallback);

// GitHub OAuth
authRouter.get("/github", githubRedirect);
authRouter.get("/github/callback", githubCallback);

export default authRouter;
