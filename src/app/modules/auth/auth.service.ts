import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const createUserIntoDb = async (payload:IUser)=> {
    const isUserExist = await User.findOne({email:payload.email});
   if (isUserExist) {
       throw new Error("User already exists");
   }
   const user = await User.create(payload);
   return user;
};

export const AuthService = {
    createUserIntoDb,
};  