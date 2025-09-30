import { Router } from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validationRequest";
import { ProductValidation } from "./product.validation";
import { upload } from "../../utils/imageSendToCloudinary";

const router = Router();

//Create Product
router.post(
  "/",
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    console.log(req.body);
    next();
  },
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct
);

//Insert Many Products
router.post("/insert-many", ProductController.insertManyProducts);

//Get All Products
router.get("/", ProductController.getAllProducts);

//Get Single Product
router.get("/:id", ProductController.getSingleProduct);

//Update Product
router.put(
  "/:id",
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct
);

//Delete Product
router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;
