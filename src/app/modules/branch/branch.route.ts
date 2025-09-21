import { Router } from "express";
import validateRequest from "../../middlewares/validationRequest";
import { BranchValidation } from "./branch.validation";
import { BranchController } from "./branch.controller";

const router = Router()

router.post('/',validateRequest(BranchValidation.createBranchValidationSchema),BranchController.createBranch)

router.get('/',BranchController.getAllBranches)

router.get('/:id',BranchController.getSingleBranch)

export const BranchRoutes = router