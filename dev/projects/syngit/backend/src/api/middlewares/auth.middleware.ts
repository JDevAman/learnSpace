import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyAccessToken } from "../../utils/jwt";
import { authService } from "../../services/auth.service";

export type AuthenticatedRequest = Request & {
  currentUser?: { id: string; email: string | null };
};

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const authReq = req as AuthenticatedRequest;

    const token = authReq.cookies?.access_token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const payload = verifyAccessToken(token);
    const user = await authService.getUserById(payload.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    authReq.currentUser = { id: user.id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};