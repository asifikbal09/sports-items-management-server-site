import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router()

//Create User
router.post('/register', AuthController.createUser)

//User Login
router.post('/login', AuthController.userLogin)

export const AuthRoutes = router;