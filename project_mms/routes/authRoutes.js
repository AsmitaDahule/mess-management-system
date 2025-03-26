const express = require("express");
const { showSignupPage, signup, showLoginPage, login, logout } = require("../controllers/authController");

const router = express.Router();

router.get("/signup", showSignupPage);
router.post("/signup", signup);
router.get("/login", showLoginPage);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
