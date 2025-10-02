import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validationRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

//Create User (by Admin only)
router.post(
  "/register",
  auth(USER_ROLE.ADMIN),
  validateRequest(AuthValidation.createUserValidationSchema),
  AuthController.createUser
);

//User Login
router.post(
  "/login",
  validateRequest(AuthValidation.loginUserValidationSchema),
  AuthController.userLogin
);

export const AuthRoutes = router;
