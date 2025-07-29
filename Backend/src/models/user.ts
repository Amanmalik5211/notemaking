import mongoose, { Document, Schema } from 'mongoose';

interface INote {
  _id?: string;
  text?: string;
}

export interface IUser extends Document {
  email: string;
  name?: string;
  DOD?: Date;
  notes: INote[];
  provider?: string;
  providerId?: string;
  isGoogleUser?:Boolean
}

const NoteSchema = new Schema<INote>({
  text: { type: String }
});

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    DOD: { type: Date },
    notes: { type: [NoteSchema], default: [] },
    provider: { type: String },
    providerId: { type: String },
    isGoogleUser:{type:Boolean,default: false}
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
