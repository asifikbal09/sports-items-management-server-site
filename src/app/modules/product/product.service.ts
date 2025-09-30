import AppError from "../../error/appError";
import QueryManager from "../../QuaryManager/quaryManager";
import { imageUploadToCloudinary } from "../../utils/imageSendToCloudinary";
import { ProductSearchableFields } from "./product.constant";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import httpStatus from "http-status";

// Create Product
const createProductIntoDB = async (file: any, productInfo: TProduct) => {
    // Generate a unique image name
  const imageName = `image_${productInfo.name}_${Date.now()}`;
  const path = file.path;
  // Upload image to Cloudinary
  const imgUrl = await imageUploadToCloudinary(imageName, path);
  if (!imgUrl) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to upload image");
  }
  // Add image URL to product info
  productInfo.imgUrl = imgUrl?.secure_url;
  const result = await Product.create(productInfo);
  return result;
};

// Insert Many Products
const insertManyProductsIntoDB = async (products: TProduct[]) => {
  console.log("I am from service");

  const result = await Product.insertMany(products);

  console.log("Inserted products:", result.length);
  return result;
};

const getAllProductsFromDB = async (query: any) => {
  const productQuery: any = new QueryManager(Product.find(), query)
    .search(ProductSearchableFields)
    .pagination()
    .sortBy()
    .filterBySportsType()
    .filterByPrice()
    .filterBySize()
    .filterByBrand()
    .filterByCondition()
    .filterByMaterial()
    .filterByColor();

  const filter: any = {};
  if (query.size) filter.size = query.size;
  if (query.sportType) filter.stype = query.sportType;
  if (query.minPrice || query.maxPrice) {
    filter.price = {
      $gte: Number(query.minPrice) || 0,
      $lte: Number(query.maxPrice) || 1000,
    };
  }
  if (query.brand) filter.brand = query.brand;
  if (query.condition) filter.condition = query.condition;
  if (query.material) filter.material = query.material;
  if (query.sportType) filter.stype = query.sportType;
  if (query.color) filter.color = query.color;
  if (query.searchTerm) {
    filter.$or = ProductSearchableFields.map((field) => ({
      [field]: { $regex: query.searchTerm, $options: "i" },
    }));
  }

  const totalProducts = await Product.countDocuments(filter);
  console.log("Total products in DB:", totalProducts);
  const result = await productQuery.modelQuery;
  return { result, totalProducts };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

const updateProductFromDB = async (
  id: string,
  updateInfo: Partial<TProduct>
) => {
  const result = await Product.findByIdAndUpdate(id, updateInfo, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
  insertManyProductsIntoDB,
};
