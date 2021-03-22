const express = require("express");
const multer = require("multer");
const router = express.Router();

const FileObject = require("../models/file_objects");
const Bucket = require('../models/buckets')

router.get("", (req, res, next) => {
  Bucket.find().then((documents) => {
    res.status(200).json({
      buckets: documents
    })
  })
});

router.post("", (req, res, next) => {
  const bucket = new Bucket({
    name: req.body.bucketName,
    location: {
      id: req.body.bucketLocation.id,
      name: req.body.bucketLocation.name,
    },
  });
  bucket
    .save()
    .then((createdBucket) => {
      res.status(201).json({
        bucket: createdBucket,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creating a bucket failed with error: " + err,
      });
    });
});

let bucketExists = (req, res, next) => {
  Bucket.countDocuments({_id: req.params.id})
    .then((count) => {
      next();
    })
    .catch(err => {
      res.status(404).json({ message: 'Document not found'});
    });
};

router.get("/:id", bucketExists, (req, res, next) => {
  Bucket.findOne({ _id: req.params.id }).then((document) => {
    res.status(200).json({
      bucket: document,
    });
  });
});

router.delete("/:id", bucketExists, (req, res, next) => {
  res.status(204).send();
});

router.get("/:id/objects", bucketExists, (req, res, next) => {
  const objectsQuery = FileObject.find({ bucket: req.params.id });
  objectsQuery
    .then((documents) => {
      res.status(200).json({
        objects: documents,
      });
    })
    .catch(() => {
      res.status(500).json({
        err: "Error fetching objects",
      });
    });
});

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
  "text/plain": "txt",
};

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    callback(error, "./backend/uploads/");
  },
  filename: function (request, file, callback) {
    const name = file.originalname.split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/:id/objects",
  bucketExists,
  upload.single("uploadFile"),
  (req, res, next) => {
    const fileObject = new FileObject({
      name: req.file.filename,
      bucket: req.params.id,
      modified: Date.now(),
      size: req.file.size,
    });
    fileObject
      .save()
      .then((createdObject) => {
        res.status(201).json({
          message: "Object created successfully",
          object: createdObject,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Creating an object failed with error: " + err,
        });
      });
  }
);


module.exports = router;
