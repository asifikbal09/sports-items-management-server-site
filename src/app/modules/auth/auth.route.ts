import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router()

//Create User
router.post('/register', AuthController.createUser)

export const AuthRoutes = router;