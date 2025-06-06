import User from "../models/Users.js";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, passwordHash: hashedPassword });
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // FIXED LINE
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "14d" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login Error:", err); // Always log full error on server
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};




export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(6).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min expiry
    await user.save();

    // In production, send this via email
    res.json({ message: "Reset token generated", resetToken });
  } catch (err) {
    res.status(500).json({ message: "Error generating token", error: err.message });
  }
};


export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Validation
  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required." });
  }

  try {
    const user = await User.findOne({ resetToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

   const hashedPassword = await bcrypt.hash(newPassword, 10);
user.passwordHash = hashedPassword;

    user.resetToken = undefined; // clear token after use
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};



export  const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};
