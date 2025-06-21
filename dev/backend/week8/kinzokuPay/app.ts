const express = require('express');
const cors = require('cors');
const config = require('./config');

const mainRouter = require("./routes/index");
const cookieParser = require('cookie-parser');
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1", mainRouter);

app.use(function (err, req, res, next) {
    console.error({ "Error Caught": err.stack || err });
    res.status(err.status || 500).send({ error: err.message || "Something went wrong!" });
})

const port = 3000;
app.listen(config.port, function () {
    console.log(`Server is up and running on ${port}`);
})

