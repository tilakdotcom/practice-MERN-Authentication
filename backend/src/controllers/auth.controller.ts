import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "@/utils/API/ApiError";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
  CREATED,
  NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN,
} from "@/constants/statusCode";
import User from "@/models/user.model";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Validate request body
    if (!name || !email || !password) {
      throw new ApiError(BAD_REQUEST, "Please enter all fields");
    }
    // Check if email already exists
    const userExists = await User.findOne(email);
    if (userExists) {
      throw new ApiError(BAD_REQUEST, "User already exists");
    }

    const verifyCode = 10000;

    const tenDays = Date.now() + 10 * 60 * 60 * 1000;
    // Create new user
    const user = new User({
      name,
      email,
      password,
      verifyToken: verifyCode,
      verifyExpire: tenDays,
    });

    user.save({ validateBeforeSave: true });
    
  }
);
