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

router.post("", (req, res, next) => {
  res.status(201).json({
    message: "Bucket created successfully",
    bucket: req.body,
  });
});

let bucketExists = (req, res, next) => {
  // TODO: use dynamic
  if (req.params.id !== "asdf") {
    return res.status(404).json({
      message: "bucket not found",
    });
  }
  next();
};

router.get("/:id", bucketExists, (req, res, next) => {
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

router.delete("/:id", bucketExists, (req, res, next) => {
  res.status(204).send();
});

router.get("/:id/objects", bucketExists, (req, res, next) => {
  res.status(200).json({
    objects: [
      {
        name: "first-file.png",
        modified: "2021-06-24T12:42:50.150Z",
        size: 1337,
      },
      {
        name: "second-file.png",
        modified: "2019-06-24T12:42:50.150Z",
        size: 1234,
      },
      {
        name: "third-file.png",
        modified: "2018-06-24T12:42:50.150Z",
        size: 41441,
      },
    ],
  });
});

router.post("/:id/objects", bucketExists, (req, res, next) => {
  res.status(201).json({
    message: "Object created successfully",
    object: req.body,
  });
});


module.exports = router;
