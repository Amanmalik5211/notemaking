import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: "Unauthorized access" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }
        console.log('user detecvted in authMiddleware', user);
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in protectedRoute:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
