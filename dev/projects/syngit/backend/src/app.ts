import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./api/v1/auth.routes";
import syncRoutes from "./api/v1/sync.routes";
import playlistRoutes from "./api/v1/playlist.routes";
import passport from "./config/passport";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/sync", syncRoutes);
app.use("/api/v1/playlists", playlistRoutes);

export { app };
