import mongoose, { Document, Schema } from "mongoose";
import { passwordValidator, passwwordHasher } from "../utils/bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      default: "Ash",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// hashed password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await passwwordHasher(this.password);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await passwordValidator(password, this.password);
}

const User = mongoose.model<IUser>("User", userSchema);

export default User;
