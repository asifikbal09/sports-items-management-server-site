import { Router } from "express";
import validateRequest from "../../middlewares/validationRequest";
import { SalesValidation } from "./sales.validation";
import { SalesController } from "./sales.controller";

const router = Router();

router.post('/',validateRequest(SalesValidation.createSalesValidationSchema),SalesController.createSales)

export const SalesRoutes = router;