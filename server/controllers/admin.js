const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

exports.getAdmin = async (req, res) => {
  const adminData = req.body;

  let foundAdmin;

  try {
    foundAdmin = await Admin.findOne(adminData);
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (!foundAdmin) return res.status(404).json({ message: "Admin not found!" });

  let token;

  try {
    token = jwt.sign(
      {
        username: foundAdmin.username
      },
      process.env.JWT_SECRET
    );
  } catch (err) {
    return res.status(500).json({ message: err.stack });
  }

  if (!token)
    return res.status(500).json({ message: "Could not create token!" });

  res.status(200).json({ admin: foundAdmin, token });
};
