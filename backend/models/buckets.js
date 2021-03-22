const mongoose = require("mongoose");

const bucketsSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
});

module.exports = mongoose.model("Bucket", bucketsSchema);
