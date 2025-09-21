import { Router } from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validationRequest";
import { ProductValidation } from "./product.validation";

const router = Router()

//Create Product

router.post('/',validateRequest(ProductValidation.createProductValidationSchema),ProductController.createProduct)

//Get All Products
router.get('/',ProductController.getAllProducts)

//Get Single Product
router.get('/:id',ProductController.getSingleProduct)

//Update Product
router.put('/:id',validateRequest(ProductValidation.updateProductValidationSchema),ProductController.updateProduct)

export const ProductRoutes = router
