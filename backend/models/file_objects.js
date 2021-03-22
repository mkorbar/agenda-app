const mongoose = require("mongoose");

const fileObjectSchema = mongoose.Schema({
  name: { type: String, requred: true },
  bucket: { type: String, requred: true },
  modified: { type: Date, default: Date.now },
  size: { type: Number, required: true },
});

module.exports = mongoose.model("FileObject", fileObjectSchema);
