import ImageKit from "imagekit";
import fs from "fs";

let imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadOnImageKit = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Read file data
    const fileData = fs.readFileSync(localFilePath);

    // Upload the file to ImageKit
    const response = await imagekit.upload({
      file: fileData,
      fileName: localFilePath.split("/").pop(),
    });

    // File has been uploaded successfully
    console.log("File uploaded on ImageKit:", response.url);
    return response;
    
  } catch (error) {
    console.error("Upload Error:", error);
    // Remove the locally saved temporary file if the upload operation failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     // upload the file on cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });

//     // file has been uploaded successfully
//     console.log("file uploaded on cloudinary", response.url);
//     return response;

//   } catch (error) {
//     fs.unlinkSync(localFilePath); // remove the localy saved temporary file as the upload operation failed.
//   }
// };

export { uploadOnImageKit };
