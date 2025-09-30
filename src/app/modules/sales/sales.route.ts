import { Router } from "express";
import validateRequest from "../../middlewares/validationRequest";
import { SalesValidation } from "./sales.validation";
import { SalesController } from "./sales.controller";

const router = Router();

//Create Sales
router.post('/',validateRequest(SalesValidation.createSalesValidationSchema),SalesController.createSales)

//Get All Sales
router.get('/',SalesController.getAllSales)

export const SalesRoutes = router;