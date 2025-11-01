// middleware/validateInputTypes.js

function validateInputTypes(req, res, next) {
    const { name, email, password } = req.body;

    if ((name && typeof name !== 'string') || (email && typeof email !== 'string') || (password && typeof password !== 'string')) {
        return res.status(400).json({
            message: "No space for injection, try again later."
        });
    }
    next();
}

module.exports = validateInputTypes;
