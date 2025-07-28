import express from "express"
import { protectedRoute } from "../middlewares/authMiddleware";
import { getOTP,verifyOTP } from "../controllers/authController.js";

const router = express.Router()


router.post('/get-otp',getOTP);
router.post('/verify-otp',verifyOTP);


export default router;