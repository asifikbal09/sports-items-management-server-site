import { Router } from "express";
import { User } from "./user.model";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";

const router = Router()

// Create User
router.post('/',validateRequest(UserValidation.createUserValidationSchema), UserController.createUser)

// Get All Users
router.get('/', UserController.getAllUsers)

export const UserRoutes = router;