import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const result = await AuthService.createUserIntoDb(userInfo);
  sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,  
  })
});

export const AuthController = {
  createUser,
};  