import express from "express"
import { getOTP,verifyOtpforSignup,uiValidation,verifyOtpforLogin } from "../controllers/authController.js";

const router = express.Router()


router.post('/get-otp',getOTP);
router.post('/verify-otp-for-signup',verifyOtpforSignup);
router.post('/verify-otp-for-login',verifyOtpforLogin);
router.get('/uiValidation',uiValidation);


export default router;