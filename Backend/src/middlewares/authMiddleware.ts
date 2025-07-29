import jwt from "jsonwebtoken";
import User from "../models/user.js"; 
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protectedRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: "Unauthorized access" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    console.log('user detecvted in authMiddleware',user)
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectedRoute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
