import mongoose, { Schema } from 'mongoose';
const otpVerificationSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }
});
export default mongoose.model('OtpVerification', otpVerificationSchema);
