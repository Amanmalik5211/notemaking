import { Request, Response } from "express";
import User from "../models/user.js";
import OtpVerification from "../models/otpVerification.js";
import nodemailer from "nodemailer";
import { generateToken } from "../lib/generateToken.js";
import jwt from 'jsonwebtoken'

interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

export const getOTP = async (req: Request, res: Response) => {
  const { email, type } = req.body;

  try {
    if (!email || !type) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    if (type === 'signup') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists. Please login instead." });
      }
    } else if (type === 'login') {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ success: false, message: "User not found. Please sign up first." });
      }
    } else {
      return res.status(400).json({ success: false, message: "Invalid request type." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OtpVerification.deleteMany({ email });
    await OtpVerification.create({ email, otp });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'prashantawasthi251@gmail.com',
        pass: 'omgp bxhi pzcd lwdk'
      }
    });

    await transporter.sendMail({
      from: 'Highway Delite',
      to: email,
      subject: `Your OTP Code for ${type} at Highway Delite`,
      text: `Your OTP code is ${otp}`,
    });

    res.status(200).json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error while sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};


export const verifyOtpforSignup = async (req: Request, res: Response) => {
  const { email, otp, name, DOB } = req.body;
  try {
    const record = await OtpVerification.findOne({ email });

    if (!record || record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    await OtpVerification.deleteMany({ email });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const newUser = await User.create({ name, email, DOB }) as { _id: string };
    generateToken(newUser._id, res);


    res.status(201).json({ success: true, message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyOtpforLogin = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }
  try {
    const record = await OtpVerification.findOne({ email });

    if (!record || record.otp !== otp) {
      return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
    }
    await OtpVerification.deleteMany({ email });
    const existingUser = await User.findOne({ email }) as { _id: string };

    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found. Please sign up first.' });
    }
    generateToken(existingUser._id, res);
    return res.status(200).json({ success: true, message: 'Login successful', userId: existingUser._id });
  } catch (error) {
    console.error('OTP login error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const uiValidation = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    return res.json({ authenticated: true, userId: decoded.userId });
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
};

export const logout = async (req: CustomRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, 
      sameSite: "strict",
    });

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong during logout" });
  }

};


export const googleLogin = async (req: CustomRequest, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Invalid Google user data" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({name,email,isGoogleUser: true, });
    }
    if (!user || !user._id) {
      return res.status(500).json({ message: "User creation failed" });
    }

    generateToken(user._id.toString(), res);
    res.status(200).json({success: true,message: "Logged in Via Google Successfully"});

  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ message: "Server error during Google login" });
  }
};
