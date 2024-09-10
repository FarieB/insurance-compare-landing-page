const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Ensure req.headers is defined
    if (!req.headers || !req.headers['x-auth-token']) {
        return res.status(400).json({ msg: 'Bad request: Headers missing' });
    }

    // Get token from header
    const token = req.headers['x-auth-token']; // Use req.headers to get the token

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, 'yourSecretKey');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

