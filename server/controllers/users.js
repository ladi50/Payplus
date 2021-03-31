const User = require("../models/user");
const Shift = require("../models/shift");

exports.signupUser = async (req, res) => {
  const userData = req.body;

  let foundUser;

  try {
    foundUser = await User.findOne({ email: userData.email });
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (foundUser)
    return res.status(422).json({ message: "Email already exists!" });

  const user = new User(userData);

  let createdUser;

  try {
    createdUser = await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }
  if (!createdUser)
    return res.status(500).json({ message: "Could not create user!" });

  res.status(201).json({ user: createdUser });
};

exports.getUsers = async (_req, res) => {
  let foundUsers;

  try {
    foundUsers = await User.find({});
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (!foundUsers) return res.status(404).json({ message: "Users not found!" });

  res.status(200).json({ users: foundUsers });
};

exports.createShift = async (req, res) => {
  const shiftData = req.body;
  const userId = req.params.userId;

  let foundShift;

  try {
    foundShift = await Shift.findOne(
      {
        userId
      },
      { createdAt: -1 }
    );
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (
    foundShift &&
    new Date(foundShift.createdAt).toLocaleDateString() ===
      new Date().toLocaleDateString()
  )
    return res.status(500).json({ message: "Shift already exists!" });

  let foundUser;

  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (!foundUser) return res.status(404).json({ message: "User not found!" });

  const shift = new Shift(shiftData);

  let createdShift;

  try {
    await foundUser.shifts.push(shift._id);
    await foundUser.save();

    createdShift = await shift.save();
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (!createdShift)
    return res.status(500).json({ message: "Could not create new shift!" });

  res.status(201).json({ shift: createdShift });
};

exports.getShifts = async (req, res) => {
  const userId = req.params.userId;

  let foundShifts;

  try {
    foundShifts = await Shift.find({ userId }).populate({
      path: "userId",
      populate: {
        path: "shifts"
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (!foundShifts)
    return res.status(404).json({ message: "Shifts not found!" });

  res.status(200).json({ shifts: foundShifts });
};

exports.getShift = async (req, res) => {
  const userId = req.params.userId;
  
  let foundShift;

  try {
    foundShift = await Shift.findOne({
      userId
    }).sort({ createdAt: -1 });
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (
    !foundShift ||
    new Date(foundShift.createdAt).toLocaleDateString() !==
      new Date().toLocaleDateString()
  )
    return res.status(200).json({ message: "Shifts not found!" });

  res.status(200).json({ shift: foundShift });
};

exports.updateShift = async (req, res) => {
  const shiftData = req.body;
  const userId = req.params.userId;

  let foundShift;

  try {
    foundShift = await Shift.findOne({
      userId
    }).sort({ createdAt: -1 });
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (
    !foundShift ||
    new Date(foundShift.createdAt).toLocaleDateString() !==
      new Date().toLocaleDateString()
  )
    return res.status(404).json({ message: "Shift not found!" });

  let updatedShift;

  try {
    for (const item in shiftData) {
      foundShift[item] = shiftData[item];
    }
    updatedShift = await foundShift.save();
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  res.status(200).json({ shift: updatedShift });
};
