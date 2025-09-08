import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

export default dbConnect;
