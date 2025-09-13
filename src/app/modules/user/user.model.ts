import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { userRolesEnum } from "./user.constant";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: userRolesEnum,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    contactNo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);