import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SalesService } from "./sales.service";
import httpStatus from "http-status";

const createSales = catchAsync(async (req, res)=>{
const salesInfo = req.body;
  const result = await SalesService.createSalesIntoDB(salesInfo);
  sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Sales created successfully",
    data: result
  })
})

const getAllSales = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await SalesService.getAllSalesFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales retrieved successfully",
    data: result
  });
});

export const SalesController = {
  createSales,
  getAllSales
}