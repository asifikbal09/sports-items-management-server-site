import dotenv from 'dotenv';
import path from 'path';
import type { StringValue } from "ms";

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default{
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    db_url: process.env.DB_URL as string,
    default_password: process.env.DEFAULT_PASSWORD,
    refresh_secret_key: process.env.REFRESH_SECRET_KEY ,
    access_secret_key: process.env.ACCESS_SECRET_KEY,
    refresh_jwt_expires_in: process.env.REFRESH_JWT_EXPIRES_IN as StringValue,
    access_jwt_expires_in: process.env.ACCESS_JWT_EXPIRES_IN as StringValue,
    salt_rounds: process.env.SALT_ROUNDS,
    cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET as string,
}