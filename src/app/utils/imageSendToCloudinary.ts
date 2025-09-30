import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});
// Function to upload image to Cloudinary
export const imageUploadToCloudinary = async (imageName:string, path:string) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      console.log(error);
    });
    // Remove file from server after upload
fs.unlink(path,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("File deleted successfully");
    }
})

  return uploadResult;
};



// Multer configuration for file upload
const storage = multer.diskStorage({
    // Set the destination
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  // Set the filename
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
