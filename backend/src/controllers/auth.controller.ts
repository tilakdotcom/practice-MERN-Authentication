import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/API/ApiError";
import User from "../models/user.model";
import { ApiResponse } from "../utils/API/ApiResponse";
import getAccessAndRefreshToken from "../utils/getAccessAndRefreshToken";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // Validate request body
    if (!name || !email || !password) {
      throw new ApiError(400, "Please enter all fields");
    }
    try {
      // Check if email already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new ApiError(400, "User already exists");
      }
      // Create new user
      const user = new User({
        name,
        email,
        password,
      });

      const savedUser = await user.save();
      savedUser.password = "";

      return res.status(201).json(
        new ApiResponse({
          statusCode: 201,
          message: "User registered successfully",
          data: {
            user: savedUser,
          },
        })
      );
    } catch (error) {
      console.log(" Error in creating User", error);
      next(error);
    }
  }
);

const cookieOptions = {
  secure: true,
  httpOnly: true,
};

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // Validate request body
    if (!email || !password) {
      throw new ApiError(400, "Please enter all fields");
    }
    try {
      //check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new ApiError(401, "Invalid credentials");
      }
      //check if password is correct
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid credentials");
      }
      const { accessToken, refreshToken } = await getAccessAndRefreshToken(
        user._id
      );

      const userAddToken = await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            refreshToken: refreshToken,
          },
        },
        { new: true }
      ).select("password refreshToken");

      if (!userAddToken) {
        throw new ApiError(500, "Failed to update user token");
      }

      return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
          new ApiResponse({
            statusCode: 200,
            message: "User logged in successfully",
            data: userAddToken,
          })
        );
    } catch (error) {
      console.log("Error in login User", error);
      next(error);
    }
  }
);
