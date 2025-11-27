import { Router } from "express";
import passport from "passport";
import { authService } from "@/services/auth.service";
import { requireAuth, AuthenticatedRequest } from "../middlewares/auth.middleware";
import { signAccessToken } from "@/utils/jwt";

const router = Router();

// Helper to set cookie with token
const setAuthCookie = (res: any, token: string) => {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// POST /api/v1/auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const { user, token } = await authService.register(email, password);

    setAuthCookie(res, token);

    res.status(201).json({
      user,
    });
  } catch (err: any) {
    if (err.message === "Email already in use") {
      return res.status(409).json({ message: err.message });
    }
    next(err);
  }
});

// POST /api/v1/auth/login
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || "Invalid credentials" });
      }

      const token = signAccessToken(user.id);
      setAuthCookie(res, token);

      res.json({ user });
    }
  )(req, res, next);
});

// GET /api/v1/auth/me
router.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
  res.json({ user: req.user });
});

// POST /api/v1/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Logged out" });
});

export default router;
