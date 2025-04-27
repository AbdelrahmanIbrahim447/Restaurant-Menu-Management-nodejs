const jwt = require('jsonwebtoken');
const config = require('../../config/app');
const { hashPassword, comparePassword } = require('../helpers/password');
const { validateLoginInput } = require('../requests/login');
const { validateRegisterInput } = require('../requests/register');

const userModel = require('../models/user');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userId = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(userId);

    res.status(201).json({
      id: userId,
      username,
      email,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await userModel.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};