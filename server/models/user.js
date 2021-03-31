const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  shifts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Shift"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
