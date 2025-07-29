import { Request, Response } from "express";
import User from "../models/user.js";
import OtpVerification from "../models/otpVerification.js";
import nodemailer from "nodemailer";
import { generateToken } from "../lib/generateToken.js";
import jwt from 'jsonwebtoken'

export const getOTP = async (req: Request, res: Response)=> {
  const { email } = req.body;

  try {
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
      subject: 'Your OTP Code for Signup at Highway Delite',
      text: `Your OTP code is ${otp}`,
    });

    res.status(200).json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error while sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp, name, DOB } = req.body;
//   console.log("verifyOTP",email, otp, name, DOB )
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

    const newUser = await User.create({ name, email, DOB })  as { _id: string };;
    generateToken(newUser._id, res);


    res.status(201).json({ success: true, message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
