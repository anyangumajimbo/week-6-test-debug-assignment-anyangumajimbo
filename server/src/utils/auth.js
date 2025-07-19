const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        'test-secret-key',
        { expiresIn: '1h' }
    );
};

module.exports = { generateToken }; 