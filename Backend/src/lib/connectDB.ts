import mongoose from "mongoose";

const connectDB = async (URL: string): Promise<void> => {
  try {
    await mongoose.connect(URL);
    console.log("DB connected");
  } catch (error) {
    console.error("Error in connecting database:", error);
  }
};

export default connectDB;
