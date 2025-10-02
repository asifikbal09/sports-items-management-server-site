
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import AppError from '../error/appError';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import { TUserRoles } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // const token = bearerToken?.split(" ").slice(-1) as string[];
    
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
      // checking if the given token is valid
    let decoded;
    try{

     decoded = jwt.verify(
        token,
        config.access_secret_key as string,
      ) as JwtPayload;
    }catch(err){
      throw new AppError(httpStatus.UNAUTHORIZED,"Unauthorized.")
    }
    const { role, _id, iat } = decoded;

    const user = await User.findById(_id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;