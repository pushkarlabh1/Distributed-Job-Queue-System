import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/user.js"; // make sure this model is in TS too
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// ✅ Define types for env variables
const JWT_SECRET = process.env.JWT_SECRET as string;

// ✅ Zod schemas
const signupData = z.object({
  username: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstname: z.string(),
  lastname: z.string(),
  isRecruiter: z.boolean(),
});

const signinData = z.object({
  username: z.string().email(),
  password: z.string(),
});

// ✅ Signup handler
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, firstname, lastname, isRecruiter } = req.body;

    // Validate input
    const validatedInputs = signupData.safeParse({
      username,
      password,
      firstname,
      lastname,
      isRecruiter,
    });

    if (!validatedInputs.success) {
      const errors = validatedInputs.error.issues.map((err:any) => err.message);
      res.status(400).json({
        message: "Validation failed",
        errors,
      });
      return;
    }

    // Check if user exists
    if (await User.findOne({ username })) {
      res.status(409).json({ message: "Email already taken" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      username,
      firstname,
      lastname,
      password: hashedPassword,
      isRecruiter,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// ✅ Signin handler
export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Validate input
    const validatedInputs = signinData.safeParse({ username, password });
    if (!validatedInputs.success) {
      res
        .status(400)
        .json({ message: "Invalid email or password format" });
      return;
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(200).json({
      token,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
