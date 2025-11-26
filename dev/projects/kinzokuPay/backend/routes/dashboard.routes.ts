import express from "express";
import authenticate from "../middlewares/authMiddleware";
import { getDashboardStats } from "../controllers/dashboard.controller";

const dashboardRouter = express.Router();
dashboardRouter.use(authenticate);

dashboardRouter.get("/stats", getDashboardStats);

export default dashboardRouter;
