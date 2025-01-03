import mongoose, { Document, Schema } from "mongoose";
import { passwordValidator, passwwordHasher } from "../utils/bcrypt";
import generateToken from "../utils/generateToken";
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
} from "../constants/env";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  refreshToken: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  verifyToken: string;
  verifyExpire: Date;
  createdAt: Date;
  updatedAt: Date;
  generateAccessToken: () => string;
  generateRefreshToken: () => string; 
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
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    verifyToken: {
      type: String,
    },
    verifyExpire: {
      type: Date,
    },
    refreshToken:{
      type: String,
      default: null,
    }
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
};

//tokens
userSchema.methods.generateAccessToken = function () {
  return generateToken(
    {
      id: this._id,
      email: this.email,
      name: this.name,
    },
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRE
  );
};

userSchema.methods.generateRefreshToken = function () {
  return generateToken(
    {
      id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRE
  );
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
