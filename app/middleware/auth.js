const jwt = require('jsonwebtoken');
const config = require('../../config/app');
const user = require('../../app/repositories/userRepository');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    // Add user from payload to request object
    req.userId = decoded.id;
    req.user = await user.find(decoded.id);

    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;