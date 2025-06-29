import User from "../../models/Users.js";
import bcrypt from "bcrypt";

// Allow any special character
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\W_]{8,}$/;

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and a special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
    });

    const { passwordHash, ...userWithoutPassword } = newUser._doc;

    res
      .status(201)
      .json({ message: "User registered successfully", user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};
