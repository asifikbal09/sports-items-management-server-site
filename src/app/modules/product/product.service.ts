import AppError from "../../error/appError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import httpStatus from "http-status";

const createProductIntoDB = async(productInfo:TProduct)=>{
const result = await Product.create(productInfo)
return result;
}

const getAllProductsFromDB = async()=>{
    const result = await Product.find();
    return result;
}

const getSingleProductFromDB = async(id:string)=>{
    const result = await Product.findById(id);
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND,'Product not found');
    }
    return result;
}

const updateProductFromDB = async(id:string, updateInfo:Partial<TProduct>)=>{
    const result = await Product.findByIdAndUpdate(id,updateInfo,{new:true});
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND,'Product not found');
    }
    return result;
}

const deleteProductFromDB = async(id:string)=>{
    const result = await Product.findByIdAndDelete(id);
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND,'Product not found');
    }
    return result;
}

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductFromDB,
    deleteProductFromDB
}