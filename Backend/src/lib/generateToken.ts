import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userId: string, res: Response): string => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "12h",
    });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 12 * 60 * 60 * 1000,
    });

    return token;
};
