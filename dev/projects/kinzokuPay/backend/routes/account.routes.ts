import express from "express";
import authenticate from "../middlewares/authMiddleware";
import {
  transferMoney,
  getRequests,
  createRequest,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  addMoney,
  getBalance,
} from "../controllers/account.controller";

const accountRouter = express.Router();
accountRouter.use(authenticate);

// Transfers
accountRouter.post("/transfer", transferMoney);

// Requests
accountRouter.get("/requests", getRequests);
accountRouter.post("/request", createRequest);
accountRouter.post("/request/accept/:id", acceptRequest);
accountRouter.post("/request/reject/:id", rejectRequest);
accountRouter.post("/request/cancel/:id", cancelRequest);

// Add money
accountRouter.put("/add-money", addMoney);

// Balance
accountRouter.get("/balance", getBalance);

export default accountRouter;
