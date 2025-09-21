import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req, res)=>{
    const productInfo = req.body;
    const result = await ProductServices.createProductIntoDB(productInfo)

    sendResponse(res,{
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Product created successfully",
        data: result
    })
})

const getAllProducts = catchAsync(async (req, res)=>{
    const result = await ProductServices.getAllProductsFromDB();
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Products retrieved successfully",
        data: result
    })
})

const getSingleProduct = catchAsync(async (req, res)=>{
    const { id } = req.params;
    const result = await ProductServices.getSingleProductFromDB(id as string);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Product retrieved successfully",
        data: result
    })
})

const updateProduct = catchAsync(async (req, res)=>{
    const { id } = req.params;
    const updateInfo = req.body;
    const result = await ProductServices.updateProductFromDB(id as string, updateInfo);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Product updated successfully",
        data: result
    })
})

const deleteProduct = catchAsync(async (req, res)=>{
    const { id } = req.params;
    const result = await ProductServices.deleteProductFromDB(id as string);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Product deleted successfully",
        data: result
    })
})

export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}