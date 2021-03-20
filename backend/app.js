const express = require("express");

const buckets = require("./routes/buckets");
const locations = require("./routes/locations");

const app = express();

app.use("/api/buckets", buckets);
app.use("/api/locations", locations);

module.exports = app;
