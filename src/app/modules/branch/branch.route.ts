import { Router } from "express";
import validateRequest from "../../middlewares/validationRequest";
import { BranchValidation } from "./branch.validation";
import { BranchController } from "./branch.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE, userRolesEnum } from "../user/user.constant";

const router = Router()

router.post('/',auth(USER_ROLE.ADMIN),validateRequest(BranchValidation.createBranchValidationSchema),BranchController.createBranch)

router.get('/',BranchController.getAllBranches)

router.get('/:id',BranchController.getSingleBranch)

export const BranchRoutes = router