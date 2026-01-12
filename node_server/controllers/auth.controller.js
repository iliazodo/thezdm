import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input check
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Both Email and Password are required" });
    }

    // Check if user with this email exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Generate verification code
    const verificationToken = Math.floor(Math.random() * 900000).toString();

    // Create new user
    const newUser = new User({
      email,
      password: hashedPass,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 1000 * 60 * 60 * 24, // Token will expires after 24 hours
    });

    // save the new user to database
    await newUser.save();

  } catch (error) {
    console.log("Error at auth.controller.js/signup: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
  } catch (error) {}
};

export const logout = async (req, res) => {
  try {
  } catch (error) {}
};
