import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import speakeasy from 'speakeasy';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '30d' });
};

const generateTempToken = (id) => {
  return jwt.sign({ id, type: '2fa_temp' }, env.JWT_SECRET, { expiresIn: '15m' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) { 
      if (user.isTwoFactorEnabled) {
        // Return a temporary token for the 2FA verification step
        return res.json({ 
          requires2FA: true, 
          message: 'Please complete 2FA',
          token: generateTempToken(user._id)
        });
      } else {
        // No 2FA required, login directly
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          requires2FA: false
        });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginVerify = async (req, res) => {
  try {
    const { token, verificationCode } = req.body;
    console.log("loginVerify called with code:", verificationCode);
    if (!token || !verificationCode) {
      console.log("Missing token or code");
      return res.status(400).json({ message: 'Token and verification code are required' });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (decoded.type !== '2fa_temp') {
      console.log("Invalid token type:", decoded.type);
      return res.status(401).json({ message: 'Invalid token type' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("User not found for id:", decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }

    console.log("Found user:", user.email, "secret:", user.twoFactorSecret);

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: String(verificationCode),
      window: 2
    });

    if (!verified) {
      console.log("speakeasy verification failed for code:", verificationCode);
      return res.status(401).json({ message: 'Invalid 2FA code' });
    }

    console.log("2FA verification successful!");
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log("Error in loginVerify:", error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({ user: req.user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
