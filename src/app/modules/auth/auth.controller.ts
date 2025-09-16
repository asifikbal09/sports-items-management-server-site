import { setRefreshTokenCookie } from "../../utils/auth.utils";
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

const userLogin = catchAsync(async (req, res) => {
  const loginInfo = req.body;
  const result = await AuthService.userLoginFromDb(loginInfo);
  setRefreshTokenCookie(res, result.refreshToken);
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data:{
        user: result.user,
        accessToken: result.accessToken,
    },  
  })    
});

export const AuthController = {
  createUser,
  userLogin,
};  