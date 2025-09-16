import { Response } from "express";
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";


export const createToken=(
    jwtPayload:{_id:string, role:string, email:string},
    secret:string,
    expiresIn:SignOptions["expiresIn"]
)=>{
    const options:SignOptions={ expiresIn: expiresIn || '1d' };
    return jwt.sign(jwtPayload, secret, options);
}

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
  };

  export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};
export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie("refreshToken");
};