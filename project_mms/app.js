const express = require("express");
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require
("./routes/attendanceRoutes");
const adminRoutes = require("./routes/adminRoutes");


const app = express();

require('dotenv').config(); 

// connect to db
connectDB();

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

// session middleware
app.use(
    session({
      secret: process.env.SESSION_SECRET, // Use a secret for signing the session ID cookie
      resave: false,
      saveUninitialized: false
    })
  );

// Set View Engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


// routes
app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/admin", adminRoutes);



app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/", (req, res) => {
    res.render("index");
})


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
