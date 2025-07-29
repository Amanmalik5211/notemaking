import mongoose, { Document, Schema } from 'mongoose';

interface INote {
  text: string;
  _id?: string; 
}

export interface IUser extends Document {
  email: string;
  name?: string;
  DOD?: Date;
  notes: INote[];
  provider?: string;
  providerId?: string;
}

const NoteSchema = new Schema<INote>({
  text: { type: String, required: true }
});

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    DOD: { type: Date },
    notes: { type: [NoteSchema], default: [] },
    provider: { type: String },
    providerId: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
