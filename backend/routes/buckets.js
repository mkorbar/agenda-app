const express = require("express");
const router = express.Router();

router.get("", (req, res, next) => {
  res.status(200).json({
    buckets: [
      {
        id: "my-first-bucket",
        name: "my-first-bucket",
        location: {
          id: "a0c51094-05d9-465f-8745-6cd9ee45b96d",
          name: "Ljubljana",
        },
      },
      {
        id: "my-second-bucket",
        name: "my-second-bucket",
        location: {
          id: "a0c51094-05d9-465f-8745-6cd9ee45b96d",
          name: "Maribor",
        },
      },
      {
        id: "my-third-bucket",
        name: "my-third-bucket",
        location: {
          id: "a0c51094-05d9-465f-8745-6cd9ee45b96d",
          name: "Celje",
        },
      },
    ],
  });
});

router.get("/:id", (req, res, next) => {
  res.status(200).json({
    bucket: {
      id: req.params.id,
      name: "my-awesome-bucket",
      location: {
        id: "a0c51094-05d9-465f-8745-6cd9ee45b96d",
        name: "Test Bucket",
      },
    },
  });
});
module.exports = router;
