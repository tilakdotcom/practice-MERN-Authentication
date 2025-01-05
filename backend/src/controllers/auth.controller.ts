import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/API/ApiError";
import User from "../models/user.model";
import { ApiResponse } from "../utils/API/ApiResponse";
import getAccessAndRefreshToken from "../utils/getAccessAndRefreshToken";
import {
  sendForgotPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mail/mailer";
import { verifyCode } from "../mail/mail.config";
import { getCustomMinutes } from "../utils/customDate";
import { v4 as uuidv4 } from "uuid";
import { CLIENT_URI } from "../constants/env";

//register
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
  httpOnly: true,
  secure: true,
};
//login
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
      ).select("-password -refreshToken");

      if (!userAddToken) {
        throw new ApiError(500, "Failed to update user token");
      }
      if (!user.verified) {
        const code = verifyCode();
        user.verifyToken = code.toString();
        user.verifyExpire = getCustomMinutes(15);
        await user.save({ validateBeforeSave: false });
        sendVerificationEmail(email, code.toString());
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

//logout
export const logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(404, "User not found");
    }
    try {
      const userNull = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            refreshToken: null,
          },
        },
        { new: true }
      );

      //validation
      if (!userNull) {
        throw new ApiError(404, "User not found");
      }

      return res
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
          new ApiResponse({
            statusCode: 200,
            message: "User logged out successfully",
          })
        );
    } catch (error) {
      console.log("Error in logout User", error);
      next(error);
    }
  }
);

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { code } = req.params;
    //validation
    if (!userId) {
      throw new ApiError(401, "unauthorized");
    }
    if (!code) {
      throw new ApiError(400, "Please enter code");
    }
    try {
      const user = await User.findById({
        _id: userId,
      }).select("-password -refreshToken");
      if (!user) {
        throw new ApiError(404, "User not found");
      }

      if (user.verifyExpire && user.verifyExpire.getTime() < Date.now()) {
        throw new ApiError(401, "Token expired");
      }

      if (user.verifyToken !== code) {
        throw new ApiError(400, "Invalid code");
      }

      //update user
      user.verifyExpire = undefined;
      user.verifyToken = undefined;
      user.verified = true;
      await user.save({ validateBeforeSave: false });
      sendWelcomeEmail(user.name, user.email);

      return res.json(
        new ApiResponse({
          statusCode: 200,
          message: "Email verified successfully",
          data: user,
        })
      );
    } catch (error) {
      console.log("Error in verify image", error);
      next(error);
    }
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    //validation
    if (!email) {
      throw new ApiError(400, "Please enter email");
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new ApiError(404, "User not found");
      }
      const code = uuidv4();

      user.resetPasswordToken = code;
      user.resetPasswordExpire = getCustomMinutes(15);

      await user.save({ validateBeforeSave: false });
      const url = `${CLIENT_URI}/reset-password/${code}`;

      sendForgotPasswordEmail(email, url);

      return res.json(
        new ApiResponse({
          statusCode: 200,
          message: "Reset password link sent successfully",
        })
      );
    } catch (error) {
      console.log("Error in forgot password", error);
      next(error);
    }
  }
);

export const verifyPasswordToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!token) {
      throw new ApiError(400, "Invalid token");
    }
    if (!newPassword) {
      throw new ApiError(400, "Please enter new password");
    }
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        throw new ApiError(404, "User not found or token expired");
      }
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(200).json(
        new ApiResponse({
          statusCode: 200,
          message: "User password changed successfully ",
        })
      );
    } catch (error) {
      console.log("Error in verify password token", error);
      next(error);
    }
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.refreshToken;
    const userId = req.user?._id;

    //validation
    if (!refreshToken || !userId) {
      throw new ApiError(401, "Unauthorized");
    }
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw new ApiError(401, "Unauthorized");
      }
      if (user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Unauthorized");
      }
      const newAccessToken = user.generateAccessToken();

      user.refreshToken = "";

      res
        .status(200)
        .cookie("accessToken", newAccessToken, cookieOptions)
        .json(
          new ApiResponse({
            statusCode: 200,
            message: "Access token refreshed successfully",
            data: user,
          })
        );
    } catch (error) {
      console.log("Error in refreshAccessToken", error);
      next(error);
    }
  }
);
