const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authenticateToken = require("../middlewares/admin");

// Routes
router.get("/register", (req, res) => res.render("adminregister"));
router.post("/register", adminController.registerAdmin);

router.get("/login", (req, res) => res.render("adminlogin"));
router.post("/login", adminController.loginAdmin);

router.get("/dashboard", authenticateToken, adminController.getAdminDashboard);
router.get("/profile", authenticateToken, adminController.getAdminProfile);

router.get("/logout", adminController.logoutAdmin);

module.exports = router;
