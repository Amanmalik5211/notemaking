import express from "express"
import { protectedRoute } from "../middlewares/authMiddleware";
import { getOTP,verifyOTP,uiValidation } from "../controllers/authController.js";

const router = express.Router()


router.post('/get-otp',getOTP);
router.post('/verify-otp',verifyOTP);
router.get('/uiValidation',uiValidation);


export default router;