import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join(process.cwd(), '.env') });

export default{
    port: process.env.PORT || 5000,
    db_url: process.env.DB_URL as string,
    default_password: process.env.DEFAULT_PASSWORD,
    refresh_secret_key: process.env.REFRESH_SECRET_KEY ,
    access_secret_key: process.env.ACCESS_SECRET_KEY,
    refresh_jwt_expires_in: process.env.REFRESH_JWT_EXPIRES_IN,
    access_jwt_expires_in: process.env.ACCESS_JWT_EXPIRES_IN,
    salt_rounds: process.env.SALT_ROUNDS
}