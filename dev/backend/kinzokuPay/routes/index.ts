import express from "express";
import userRouter from "./user";
import accountRouter from "./account";
import authRouter from "./auth";
import transactionRouter from "./transactions";

const mainRouter = express.Router();

mainRouter.get("/", function (req, res) {
  res.send("API is live");
});
mainRouter.use("/user", userRouter);
mainRouter.use("/payments", accountRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/transactions", transactionRouter);

export default mainRouter;
