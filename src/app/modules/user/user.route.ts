import { Router } from "express";
import { User } from "./user.model";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";

const router = Router()

// Create User
router.post('/',validateRequest(UserValidation.createUserValidationSchema), UserController.createUser)

export const UserRoutes = router;