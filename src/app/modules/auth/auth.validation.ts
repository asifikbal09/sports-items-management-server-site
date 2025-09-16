import { z } from "zod";
import { userRolesEnum } from "../user/user.constant";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      error: "Name is required",
    }),
    email: z.email("Invalid email address"),
    password: z
      .string({
        error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters long"),
    role: z.enum(userRolesEnum).optional(),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    password: z
      .string({
        error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters long"),
  }),
});

export const AuthValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
