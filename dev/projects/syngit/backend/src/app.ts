import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./api/v1/auth.routes";
// import syncRoutes from "./api/v1/sync.routes";
// import playlistRoutes from "./api/v1/playlist.routes";
import passport from "./config/passport";
import { prisma } from "./lib/prisma";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/v1/auth", authRoutes);

app.get("/debug-db", async (_req, res) => {
  try {
    const users = await prisma.user.findMany({ take: 1 });
    res.json({ ok: true, usersCount: users.length });
  } catch (e: any) {
    console.error("Prisma error:", e);
    res.status(500).json({ ok: false, error: e.message });
  }
});
// app.use("/api/v1/sync", syncRoutes);
// app.use("/api/v1/playlists", playlistRoutes);

export { app };
