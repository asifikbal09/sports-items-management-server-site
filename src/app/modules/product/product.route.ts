import { Router } from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validationRequest";
import { ProductValidation } from "./product.validation";

const router = Router()

//Create Product

router.post('/',validateRequest(ProductValidation.createProductValidationSchema),ProductController.createProduct)

router.get('/',ProductController.getAllProducts)

router.get('/:id',ProductController.getSingleProduct)

export const ProductRoutes = router
