import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type IUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "seller";
  imgUrl?: string;
  address?: string;
  contactNo?: string;
  isPasswordChanged?: boolean;
};

export type TUserRoles = keyof typeof USER_ROLE;
export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    planeTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
