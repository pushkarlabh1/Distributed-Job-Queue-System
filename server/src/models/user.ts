import mongoose, { Document, Schema } from "mongoose";

// Define a TypeScript interface for the User document
export interface IUser extends Document {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  isRecruiter: boolean;
}

// Define the schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    lowercase: true,
    trim: true,
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isRecruiter: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Export the model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
