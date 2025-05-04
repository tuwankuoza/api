const jwt = require("jsonwebtoken");
const Account = require("../models/Account");

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  const account = await Account.findOne({ userName, password });
  if (!account) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: account.userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};
