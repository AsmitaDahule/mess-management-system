const express = require("express");
const { showAttendancePage, markAttendance, viewAttendanceReport } = require("../controllers/attendanceController");

const router = express.Router();

router.get("/mark", showAttendancePage);
router.post("/mark", markAttendance);
router.get("/report", viewAttendanceReport);

module.exports = router;
