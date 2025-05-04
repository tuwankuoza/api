const User = require("../models/User");
const Account = require("../models/Account");

exports.getUserByAccountNumber = async (req, res) => {
  const redisClient = req.app.get("redisClient");
  const { accountNumber } = req.params;
  const cacheKey = `user:accountNumber:${accountNumber}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const user = await User.findOne({ accountNumber });
  if (!user) return res.status(404).json({ message: "User not found" });

  await redisClient.set(cacheKey, JSON.stringify(user), { EX: 60 }); // cache 1 min
  res.json(user);
};

exports.getUserByRegistrationNumber = async (req, res) => {
  const redisClient = req.app.get("redisClient");
  const { registrationNumber } = req.params;
  const cacheKey = `user:regNumber:${registrationNumber}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const user = await User.findOne({ registrationNumber });
  if (!user) return res.status(404).json({ message: "User not found" });

  await redisClient.set(cacheKey, JSON.stringify(user), { EX: 60 });
  res.json(user);
};

exports.getAccountsLastLoginGtDays = async (req, res) => {
  const days = parseInt(req.params.days);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const accounts = await Account.find({
    lastLoginDateTime: { $gt: cutoffDate },
  });
  res.json(accounts);
};
