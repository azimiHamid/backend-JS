import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async function (req, res) {
  res.status(200).json({
    message: "Ok",
  });
});

export { registerUser };
