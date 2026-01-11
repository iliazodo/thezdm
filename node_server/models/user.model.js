import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    typeof: String,
    required: true,
    unique: true,
  },
  email: {
    typeof: String,
    required: true,
    unique: true,
  },
  password: {
    typeof: String,
    required: true,
  },
  clerkId: {
    typeof: String,
    required: true,
    unique: true,
  },
}, { timestamps: true});

export const User = mongoose.model("User", userSchema);
