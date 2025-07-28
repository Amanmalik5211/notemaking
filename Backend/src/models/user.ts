import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  DOD?: Date;
  notes: string[];
  provider?: string;
  providerId?: string;
  OTP?: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    DOD: { type: Date },
    notes: { type: [String], default: [] },
    provider: { type: String },
    providerId: { type: String },
    OTP: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);

