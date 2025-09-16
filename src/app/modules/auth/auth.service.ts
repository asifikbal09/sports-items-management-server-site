import config from "../../config";
import { createToken } from "../../utils/auth.utils";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const createUserIntoDb = async (payload:IUser)=> {
    const isUserExist = await User.findOne({email:payload.email});
   if (isUserExist) {
    //TODO: Handle this error properly
       throw new Error("User already exists");
   }
   const user = await User.create(payload);
   return user;
};

const userLoginFromDb = async(payload:{email:string, password:string})=>{
    const {email, password} = payload;
    const isUserExist = await User.findOne({email}).select("+password");
    if(!isUserExist){
        //TODO: Handle this error properly
        throw new Error("User does not exist");
    }
    const isPasswordMatched = await User.isPasswordMatched(password, isUserExist.password);
    if(!isPasswordMatched){
        //TODO: Handle this error properly
        throw new Error("Password is incorrect");
    }

    const jwtPayload = {
        _id: isUserExist._id.toString(),
        role: isUserExist.role,
        email: isUserExist.email,
    }
    const accessToken = createToken(
        jwtPayload,
        config.access_secret_key as string,
        config.access_jwt_expires_in
    )

    const refreshToken = createToken(
        jwtPayload,
        config.refresh_secret_key as string,
        config.refresh_jwt_expires_in
    )
    
    const result = {
        user:{
            name: isUserExist.name,
            email: isUserExist.email,
            role: isUserExist.role,
            imgUrl: isUserExist.imgUrl,
            address: isUserExist.address,
            contactNo: isUserExist.contactNo,
            isPasswordChanged: isUserExist.isPasswordChanged,
        },
        accessToken,
        refreshToken,
    }
    return result;
};


export const AuthService = {
    createUserIntoDb,
    userLoginFromDb,
};  