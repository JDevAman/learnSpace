import express from "express"
import userRouter from "./user";
import accountRouter from "./account";

const mainRouter = express.Router();

mainRouter.get("/", function (req, res) {
    res.send("API is live")
})
mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);

export default mainRouter;