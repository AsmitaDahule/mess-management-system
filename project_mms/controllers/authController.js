const bcrypt = require("bcryptjs");
const userModel = require("../models/user");

// Show signup page
const showSignupPage = (req, res) => {
    res.render("signup");
};


// Show login page
const showLoginPage = (req, res) => {
    res.render("login");
};



const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.redirect("/auth/login");
    } catch (err) {
        res.status(500).send("Server error");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found!");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Incorrect Password!");
        }

        req.session.userId = user._id;
        res.redirect("/home");
    } catch (err) {
        res.status(500).send("Server error");
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error during logout");
        }
        res.redirect("/auth/login");
    });
};


module.exports = { showSignupPage, signup, showLoginPage, login, logout };
