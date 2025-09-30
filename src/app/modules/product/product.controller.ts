import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req, res) => {
  const productInfo = req.body;
  const result = await ProductServices.createProductIntoDB(req.file, productInfo);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const insertManyProducts = catchAsync(async (req, res) => {
  const products = req.body.products;
  const result = await ProductServices.insertManyProductsIntoDB(products);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Products inserted successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ProductServices.getAllProductsFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    meta:{
        total: result.totalProducts,
        page: Number(query.page) || 1,
        limit: Number(query.limit) || 10,
    },
    data: result.result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const result = await ProductServices.updateProductFromDB(
    id as string,
    updateInfo
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  insertManyProducts,
};
