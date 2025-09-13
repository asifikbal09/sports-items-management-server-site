import { z } from "zod";
import { userRolesEnum } from "./user.constant";

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().min(2).max(100),
        email: z.email().max(100),
        password: z.string().min(6).max(100),
        role: z.enum(userRolesEnum),
        imgUrl: z.string().optional(),
        address: z.string().max(200).optional(),
        contactNo: z.string().min(10).max(15).optional(),
    })
})

export const UserValidation = {
    createUserValidationSchema
}