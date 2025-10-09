import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Sign JWT
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    // Convert COOKIE_EXPIRES to number (days) -> milliseconds
    const cookieExpiresMs = (Number(process.env.COOKIE_EXPIRES_IN) || 7) * 24 * 60 * 60 * 1000;

    res
      .cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: cookieExpiresMs,
      })
      .status(201)
      .json({ user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user._id);

    const cookieExpiresMs = (Number(process.env.COOKIE_EXPIRES_IN) || 7) * 24 * 60 * 60 * 1000;

    res
      .cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: cookieExpiresMs,
      })
      .status(200)
      .json({ user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Logout
export const logout = (req, res) => {
  res
    .cookie(process.env.COOKIE_NAME, "", { httpOnly: true, expires: new Date(0) })
    .status(200)
    .json({ message: "Logged out" });
};

// Get current user
export const getUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};
