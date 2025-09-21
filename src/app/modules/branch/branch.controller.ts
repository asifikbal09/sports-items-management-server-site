import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BranchService } from "./branch.service";
import httpStatus from "http-status";

const createBranch = catchAsync(async (req, res)=>{
  const branchInfo = req.body;
  const result = await BranchService.createBranchIntoDB(branchInfo);
  sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Branch created successfully",
    data: result
  })
})

const getAllBranches = catchAsync(async (req, res)=>{
  const result = await BranchService.getAllBranchesFromDB();
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Branches retrieved successfully",
    data: result
  })
})

const getSingleBranch = catchAsync(async (req, res)=>{
  const { id } = req.params;
  const result = await BranchService.getSingleBranchFromDB(id as string);
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Branch retrieved successfully",
    data: result
  })
})

export const BranchController = {
  createBranch,
  getAllBranches,
  getSingleBranch
}