const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const buckets = require("./routes/buckets");
const locations = require("./routes/locations");

const app = express();


mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.error("Database connection failed!");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Autorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/buckets", buckets);
app.use("/api/locations", locations);

module.exports = app;
