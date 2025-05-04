const express = require("express");
const router = express.Router();
const {
  getUserByAccountNumber,
  getUserByRegistrationNumber,
  getAccountsLastLoginGtDays,
} = require("../controllers/userController");

router.get("/accountNumber/:accountNumber", getUserByAccountNumber);
router.get(
  "/registrationNumber/:registrationNumber",
  getUserByRegistrationNumber
);
router.get("/loginAfter/:days", getAccountsLastLoginGtDays);

module.exports = router;
