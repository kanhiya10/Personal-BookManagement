import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log({
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secretExists: !!process.env.CLOUDINARY_API_SECRET,
});

console.log(process.env.DB_NAME);
console.log(process.env.MONGODB_URI);

const UploadOnCloudinary = async (localFilePath, transformation = []) => {
    try {
        console.log("localFilePath:", localFilePath);
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            transformation,
        });
        console.error("Cloudinary upload failed:",response);

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        return null;
    }
};


const RemoveFromCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.destroy(localFilePath);
        return response;
    }
    catch (error) {
        // fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed.
        return null;
    }
}






export { UploadOnCloudinary, RemoveFromCloudinary };