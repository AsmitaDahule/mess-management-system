const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");


// Admin Registration
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.render("adminregister", { errorMessage: "Email already exists" });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.render("adminregister", { errorMessage: "Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new adminModel({ name, email, password: hashedPassword });
        await newAdmin.save();

        console.log("Admin registered successfully");
        res.redirect("/admin/login");
    } catch (error) {
        console.error("Error registering admin:", error);
        res.render("adminregister", { errorMessage: "Server error" });
    }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.render("adminlogin", { errorMessage: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.render("adminlogin", { errorMessage: "Invalid password" });
        }

        const payload = { admin: { id: admin.id } };
        const jwtSecret = process.env.JWT_SECRET || "your_secret_key";

        jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
            if (err) throw err;
            res.cookie("token", token, { httpOnly: true });
            res.redirect("/admin/dashboard");
        });

    } catch (error) {
        console.error("Error logging in admin:", error);
        res.render("adminlogin", { errorMessage: "Server error" });
    }
};

// Admin Profile
exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await adminModel.findById(req.admin.id).select("-password");
        if (!admin) return res.status(404).send("Admin not found");
        res.render("adminprofile", { admin });
    } catch (error) {
        console.error("Error fetching admin:", error);
        res.status(500).send("Server error");
    }
};

// Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
    try {
        const admin = await adminModel.findById(req.admin.id).select("-password");
        if (!admin) return res.status(404).send("Admin not found");
        res.render("admindashboard", { admin });
    } catch (error) {
        console.error("Error fetching admin:", error);
        res.status(500).send("Server error");
    }
};

// Logout Admin
exports.logoutAdmin = (req, res) => {
    res.clearCookie("token");
    res.redirect("/admin/login");
};
