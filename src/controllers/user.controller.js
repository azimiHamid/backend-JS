import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnImageKit } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

const registerUser = asyncHandler(async function (req, res) {
  const { username, email, fullname, password } = req.body;
  if (
    [username, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User's email or username already exist!");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required!");
  }

  const avatar = await uploadOnImageKit(avatarLocalPath);
  const coverImage = await uploadOnImageKit(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar image is required!");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user.");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully."));
});

export { registerUser };
