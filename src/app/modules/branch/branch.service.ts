import AppError from "../../error/appError";
import { TBranch } from "./branch.interface";
import { Branch } from "./branch.model";
import httpStatus from "http-status";

const createBranchIntoDB = async (branch: TBranch) => {
  const result = await Branch.create(branch)

  return result
}

const getAllBranchesFromDB = async () => {
  const result = await Branch.find()
  return result
}

const getSingleBranchFromDB = async (id: string) => {
  const result = await Branch.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Branch not found")
  }
  return result
}

export const BranchService = {
  createBranchIntoDB,
  getAllBranchesFromDB,
  getSingleBranchFromDB
}