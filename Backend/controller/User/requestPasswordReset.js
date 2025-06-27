import User from "../../models/Users.js";
import crypto from "crypto";

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(6).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    res.json({ message: "Reset token generated", resetToken });
  } catch (err) {
    res.status(500).json({ message: "Error generating token", error: err.message });
  }
};
