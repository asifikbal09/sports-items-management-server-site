import { startSession } from "mongoose";
import AppError from "../../error/appError";
import { Branch } from "../branch/branch.model";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";
import { TSales } from "./sales.interface";
import httpStatus from "http-status";
import { Sales } from "./sales.model";

const createSalesIntoDB = async (salesData: TSales) => {
 const {productId, sellerId, branchId, quantity,} = salesData;
 const isProductExist = await Product.findById(productId);
 if (!isProductExist) {
   throw new AppError(httpStatus.NOT_FOUND, "Product not found");
 }
 const isSellerExist = await User.findById(sellerId);
 if (!isSellerExist) {
   throw new AppError(httpStatus.NOT_FOUND, "Seller not found");
 }
 const isBranchExist = await Branch.findById(branchId);
 if (!isBranchExist) {
   throw new AppError(httpStatus.NOT_FOUND, "Branch not found");
 }
 if (isProductExist.quantity < quantity) {
   throw new AppError(httpStatus.BAD_REQUEST, "Insufficient product stock");
 }
    const session = await startSession();
    try {
      session.startTransaction();
      const updatedProduct = await Product.findByIdAndUpdate(productId, { quantity: isProductExist.quantity - quantity }, { new: true, session });
      if (!updatedProduct) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found");
      }
      const result = await Sales.create([salesData], { session });
      if (result.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create sales");
      }
      await session.commitTransaction();
      return result[0];
    } catch (error) {
      await session.abortTransaction();
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create sales");
    } finally {
      session.endSession();
    }
}

export const SalesService = {
  createSalesIntoDB,
}