const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Define limiter
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: "Too many login/signup attempts, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

const validateInputTypes = require('../middleware/validateInputTypes');
const { registerUser, loginUser, getUserProfile, verifyToken } = require('../controllers/authController');
const passport = require('passport');

// Custom sanitize middleware
function sanitizationMiddleware(req, res, next) {
    if (req.body) mongoSanitize.sanitize(req.body);
    if (req.query) mongoSanitize.sanitize(req.query);
    if (req.params) mongoSanitize.sanitize(req.params);
    next();
}

// Register
router.post('/register',validateInputTypes, authLimiter, sanitizationMiddleware , registerUser);

// Login
router.post('/login',validateInputTypes, authLimiter, sanitizationMiddleware,  loginUser);

// Protected route
router.get('/profile', passport.authenticate('jwt', { session: false }), getUserProfile);

// Verify Token Route (for dashboard auth check)
router.post("/verify-token", verifyToken);

module.exports = router;
