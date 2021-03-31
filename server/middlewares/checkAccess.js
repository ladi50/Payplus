const checkAccess = async (req, res, next) => {
  const adminId = req.adminId;
  const admin = req.body.adminId;

  if (adminId !== admin)
    return res.status(401).json({ message: "Unauthorized!" });

  next();
};

module.exports = checkAccess;
