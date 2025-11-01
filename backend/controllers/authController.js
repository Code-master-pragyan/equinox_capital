require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersModel');
const validator = require('validator');

// Regex patterns (must match frontend)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
const nameRegex = /^[a-zA-Z\s]{2,50}$/;

// Sanitize input to prevent NoSQL injection
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    // Remove any MongoDB operators like $ne, $gt, etc.
    return input.replace(/[\$\{\}]/g, '');
};

exports.registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Input type validation and sanitization
        if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: "Invalid input types. Please check your inputs." });
        }

        name = sanitizeInput(name?.trim());
        email = sanitizeInput(email?.toLowerCase().trim());

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!nameRegex.test(name)) {
            return res.status(400).json({ message: "Invalid name format (2-50 letters only)" });
        }

        if (!validator.isEmail(email) || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be 8+ chars with uppercase, lowercase, number, and special char"
            });
        }


        const existingUser = await User.findOne({ emailId: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            emailId: email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // ✅ Set token as HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // set to true in production with HTTPS
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',// allows cookie across different ports on localhost
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/',
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token, // still send in response for localStorage fallback if needed
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.emailId,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
        // Send user friendly error that no injection allowed
        return res.status(400).json({
            message: "No space for injection, try again later.",
            error: error.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Sanitize
        email = sanitizeInput(email?.toLowerCase().trim());

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!validator.isEmail(email) || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Find user with sanitized email
        const user = await User.findOne({ emailId: email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const payload = { id: user._id, name: user.name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        // ✅ Set token as HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // set to true in production with HTTPS
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        });

        res.json({
            success: true,
            token, // still send in response
            user: {
                id: user._id,
                name: user.name,
                email: user.emailId,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Modified to read token from cookie
exports.verifyToken = async (req, res) => {
    try {
        // Try to get token from cookie first, then from header
        let token = req.cookies?.token;

        if (!token) {
            const authHeader = req.headers.authorization;
            token = authHeader && authHeader.split(" ")[1];
        }

        console.log("[verifyToken] Received token:", token ? "Yes" : "No");

        if (!token) {
            return res.status(401).json({ valid: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("[verifyToken] Token decoded:", decoded);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ valid: false, message: "User not found" });
        }

        return res.json({
            valid: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.emailId
            }
        });
    } catch (error) {
        console.error("[verifyToken] Error:", error.message);
        return res.status(401).json({ valid: false, message: "Invalid or expired token" });
    }
};

exports.getUserProfile = async (req, res) => {
    res.json({ user: req.user });
};
