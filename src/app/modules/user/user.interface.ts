import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type IUser = {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "SELLER";
  imgUrl?: string;
  address?: string;
  contactNo?: string;
  isPasswordChanged?: boolean;
  branchId: Types.ObjectId;
};

export type TUserRoles = keyof typeof USER_ROLE;
export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    planeTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
