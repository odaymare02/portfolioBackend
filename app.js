const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/portfolios", require("./routes/portfolio.routes"));

app.use(require("./middlewares/errorHandler"));

module.exports = app;
