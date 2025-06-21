const express = require('express');
const userRouter = require('./user');
const mainRouter = express.Router();

mainRouter.get("/", function (req, res) {

})
mainRouter.use("/user", userRouter);

module.exports = mainRouter;