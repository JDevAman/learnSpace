import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/jwt";
import { authService } from "@/services/auth.service";

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string | null };
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const payload = verifyAccessToken(token);
    const user = await authService.getUserById(payload.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
