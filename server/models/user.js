const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  avatar: { type: String, require: true },
  allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
});

module.exports = mongoose.model("User", userSchema);
