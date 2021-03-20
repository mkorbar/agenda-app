const express = require("express");

const buckets = require("./routes/buckets");

const app = express();

app.use("/api/buckets", buckets);

module.exports = app;
