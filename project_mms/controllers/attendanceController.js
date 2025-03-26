const attendanceModel = require("../models/attendance");

// Show attendance marking page
const showAttendancePage = async (req, res) => {
    if (!req.session.userId) return res.redirect("/login");

    const records = await attendanceModel.find({ userId: req.session.userId });
    res.render("attendance", { records });
};

// Mark attendance
const markAttendance = async (req, res) => {
    if (!req.session.userId) return res.redirect("/login");

    const newAttendance = new attendanceModel({ 
        userId: req.session.userId,
        status: "Present"
    });
    await newAttendance.save();

    res.redirect("/attendance/report");
};

// View attendance report
const viewAttendanceReport = async (req, res) => {
    if (!req.session.userId) return res.redirect("/login");

    const records = await attendanceModel.find({ userId: req.session.userId });
    res.render("attendance", { records });
};

module.exports = { showAttendancePage, markAttendance, viewAttendanceReport };
