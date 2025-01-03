import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/API/ApiError";
import { ACCESS_TOKEN_SECRET } from "../constants/env";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";

// Extend Request to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

const verifyUser = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // validate token
    if (!token) {
      throw new ApiError(401, "Not authorized, token is required");
    }

    //token decode
    const decode: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findById(decode?.id).select(
      "refreshToken password"
    );

    if (!user) {
      throw new ApiError(403, "Unauthorized, user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Middleware", error);
    next(error);
  }
});

export default verifyUser;
