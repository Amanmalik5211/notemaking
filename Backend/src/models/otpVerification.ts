import mongoose, { Document, Schema } from 'mongoose';

export interface IOtpVerification extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpVerificationSchema: Schema<IOtpVerification> = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } 
});

export default mongoose.model<IOtpVerification>('OtpVerification', otpVerificationSchema);


