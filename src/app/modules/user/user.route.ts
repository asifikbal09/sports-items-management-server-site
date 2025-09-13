import { Router } from "express";
import { User } from "./user.model";
import { UserController } from "./user.controller";

const router = Router()

// Create User
router.post('/', UserController.createUser)

export const UserRoutes = router;