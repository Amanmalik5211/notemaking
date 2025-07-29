import express from "express"
import { getOTP,verifyOtpforSignup,uiValidation,verifyOtpforLogin,logout } from "../controllers/authController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
const router = express.Router()


router.post('/get-otp',getOTP);
router.post('/verify-otp-for-signup',verifyOtpforSignup);
router.post('/verify-otp-for-login',verifyOtpforLogin);
router.get('/uiValidation',uiValidation);
router.get('/logout',protectedRoute,logout)


export default router;