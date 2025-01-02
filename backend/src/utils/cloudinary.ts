import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_NAME, CLOUDINARY_API_SECRET } from "../constants/env";



if (
  !CLOUDINARY_API_NAME ||
  !CLOUDINARY_API_KEY ||
  !CLOUDINARY_API_SECRET
) {
  console.error("Missing required environment variables for Cloudinary");
  console.log({
  cloud_name: CLOUDINARY_API_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  })
  process.exit(1); 
}


// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_API_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//upload image to cloudinary
const uploadImageToCloudinary = async (localImagePath: string) => {
  if (!localImagePath) {
    throw new Error("Local image path is required!");
  }
  try {
    const uploadResult = await cloudinary.uploader.upload(localImagePath, {
      folder: "food-delivery-app",
      public_id: Date.now().toString(),
      format: "jpg",
      width: 1000,
      height: 1000,
      crop: "fill",
      quality: "auto:good",
    });

    //validation
    if (!uploadResult.secure_url) {
      throw new Error("Failed to upload image to Cloudinary!");
    }
    console.log("successfully image uploaded");
    return uploadResult;
  } catch (error) {
    throw new Error(`Error uploading image to Cloudinary: ${error}`);
  } finally {
    fs.unlinkSync(localImagePath);
  }
};

export default uploadImageToCloudinary;