import mongoose, { Schema } from 'mongoose';
const NoteSchema = new Schema({
    text: { type: String }
});
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    DOD: { type: Date },
    notes: { type: [NoteSchema], default: [] },
    provider: { type: String },
    providerId: { type: String },
    isGoogleUser: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('User', UserSchema);
