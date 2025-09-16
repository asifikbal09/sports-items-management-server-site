import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validationRequest";
import { AuthValidation } from "./auth.validation";

const router = Router()

//Create User
router.post('/register',validateRequest(AuthValidation.createUserValidationSchema), AuthController.createUser)

//User Login
router.post('/login',validateRequest(AuthValidation.loginUserValidationSchema), AuthController.userLogin)

export const AuthRoutes = router;