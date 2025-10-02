import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { USER_ROLE, userRolesEnum } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser, UserModel>(
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
      select: false,
    },
    role: {
      type: String,
      enum: userRolesEnum,
      required: true,
      default: USER_ROLE.SELLER,
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
    isPasswordChanged: {
      type: Boolean,
      default: false,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Using mongoose pre hook for password hashing before saving data into database
userSchema.pre("save", async function (next) {
  const password = this.password;
  const hashedPassword = await bcrypt.hash(password, Number(config.salt_rounds));
  this.password = hashedPassword;

  next();
});

userSchema.statics.isPasswordMatched = async function (
  planeTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(planeTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>("User", userSchema);
