import User from "../models/user.model";
import { ApiError } from "./API/ApiError";

const getAccessAndRefreshToken = async (userId: any) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(401, "User not found");
    }
    //generate access token and refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    //save refresh token in database
    await user.save({ validateBeforeSave: false });


    return { accessToken, refreshToken };

  } catch (error) {
    console.log("Error getting access token", error);
    throw new ApiError(500, "Error getting refresh and access", error);
  }
};


export default getAccessAndRefreshToken