const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    break: {
      type: Date
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    breakFinished: {
      type: Date
    },
    shiftEnd: {
      type: Date
    }
  },
  { timestamps: true }
);

const Shift = mongoose.model("Shift", shiftSchema);

module.exports = Shift;
