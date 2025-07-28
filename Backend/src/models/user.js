import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    DOD: { type: Date },
    notes: { type: [String], default: [] },

    provider: { type: String },
    providerId: { type: String },
    OTP: { type: String } 
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
