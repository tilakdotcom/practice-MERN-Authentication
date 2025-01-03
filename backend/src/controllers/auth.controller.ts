import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/API/ApiError";
import User from "../models/user.model";
import { ApiResponse } from "../utils/API/ApiResponse";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Validate request body
    if (!name || !email || !password) {
      throw new ApiError(400, "Please enter all fields");
    }
    try {
      // Check if email already exists
      const userExists = await User.findOne(email);
      if (userExists) {
        throw new ApiError(400, "User already exists");
      }
      // Create new user
      const user = new User({
        name,
        email,
        password,
      });
      user.save();

      user.password = "";

      return res.status(201).json(
        new ApiResponse({
          statusCode: 201,
          message: "User registered successfully",
          data: { user },
        })
      );
    } catch (error) {
      throw new ApiError(500, " Error in creating user ");
    }
  }
);
