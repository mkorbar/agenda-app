const { route } = require("./buckets");

const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
  res.status(200).json({
    locations: [
      {
        id: "a0c51094-05d9-465f-8745-6cd9ee45b123",
        name: "Ljubljana",
      },
      {
        id: "a0c51094-05d9-465f-8745-6cd9ee45b2354",
        name: "Maribor",
      },
      {
        id: "a0c51094-05d9-465f-8745-6cd9ee45b3643",
        name: "Celje",
      },
    ],
  });
});

router.get("/:id", (req, res, next) => {
  res.status(200).json({
    location: {
      id: req.params.id,
      name: "Ljubljana",
    },
  });
});

module.exports = router;
