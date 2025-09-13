import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUserIntoDB(user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
};