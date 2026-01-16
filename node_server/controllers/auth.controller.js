import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../emailService/emails.js";

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
    const verificationToken = crypto.randomInt(100000, 999999).toString();

    // Create new user
    const newUser = new User({
      email,
      password: hashedPass,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 1000 * 60 * 60 * 24, // Token will expires after 24 hours
    });

    // save the new user to database
    await newUser.save();

    // Jwt token
    generateTokenAndSetCookie(res, newUser._id);

    sendVerificationEmail(newUser.email, verificationToken);

    return res.status(201).json({ message: "User created Successfully" });
  } catch (error) {
    console.log("Error at auth.controller.js/signup: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error at auth.controller.js/login: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({message: "Logged out successfully"});
  } catch (error) {
    console.log("Error at auth.controller.js/logout: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    // Finding user by the verify code
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification code!" });
    }

    // Updating user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // !!! COMING SOON: Welcome email !!!

    return res.status(200).json({
      message: "Email verified successfully!",
    });
  } catch (error) {
    console.log("Error at auth.controller.js/verifyEmail: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
