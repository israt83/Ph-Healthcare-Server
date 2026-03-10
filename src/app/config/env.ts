
import dotenv from "dotenv";
import AppError from "../errorHelpers/AppError";
import status from "http-status";

dotenv.config();

interface EnvConfig {
    NODE_ENV : string,
    PORT : number,
    DATABASE_URL : string,
    BETTER_AUTH_SECRET : string,
    BETTER_AUTH_URL : string,
     FRONTEND_URL : string,
    ACCESS_TOKEN_SECRET : string,
    REFRESH_TOKEN_SECRET : string,
    ACCESS_TOKEN_EXPIRES_IN : string,
    REFRESH_TOKEN_EXPIRES_IN : string,
    BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN : string,
    BETTER_AUTH_SESSION_TOKEN_UPDATE_INTERVAL : string,
    EMAIL_SENDER :{
        SMTP_HOST : string,
        SMTP_PORT : string,
        SMTP_USER: string,
        SMTP_PASS : string,
        SMTP_FROM : string
    },
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CLIENT_SECRET: string,
    CLOUDINARY_CLOUD_NAME: string,
    CLOUDINARY_API_KEY: string,
    CLOUDINARY_API_SECRET: string
   
}

const loadEnvVariables = () : EnvConfig => {

    const requiredVariables =[
        "NODE_ENV",
        "PORT",
        "DATABASE_URL",
        "BETTER_AUTH_SECRET",
        "BETTER_AUTH_URL",
        "FRONTEND_URL",
        "ACCESS_TOKEN_SECRET",
        "REFRESH_TOKEN_SECRET",
        "ACCESS_TOKEN_EXPIRES_IN",
        "REFRESH_TOKEN_EXPIRES_IN",
        "BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN",
        "BETTER_AUTH_SESSION_TOKEN_UPDATE_INTERVAL",
        "EMAIL_SENDER_SMTP_HOST",
        "EMAIL_SENDER_SMTP_PORT",
        "EMAIL_SENDER_SMTP_USER",
        "EMAIL_SENDER_SMTP_PASS",
        "EMAIL_SENDER_SMTP_FROM",
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET"
    ]

    requiredVariables.forEach((variable) => {
        if(!process.env[variable]){
            throw new AppError(status.INTERNAL_SERVER_ERROR,`Environment variable ${variable} is required but not set in .env file.`)
        }
    })

    return {
        NODE_ENV : process.env.NODE_ENV as string,
        PORT : process.env.PORT as unknown as number,
        DATABASE_URL : process.env.DATABASE_URL as string,
        BETTER_AUTH_SECRET : process.env.BETTER_AUTH_SECRET as string,
        BETTER_AUTH_URL : process.env.BETTER_AUTH_URL as string,
        FRONTEND_URL : process.env.FRONTEND_URL as string,
        ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET as string,
        REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET as string,
        ACCESS_TOKEN_EXPIRES_IN : process.env.ACCESS_TOKEN_EXPIRES_IN as string,
        REFRESH_TOKEN_EXPIRES_IN : process.env.REFRESH_TOKEN_EXPIRES_IN as string,
        BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN : process.env.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN as string,
        BETTER_AUTH_SESSION_TOKEN_UPDATE_INTERVAL : process.env.BETTER_AUTH_SESSION_TOKEN_UPDATE_INTERVAL as string,
        EMAIL_SENDER : {
            SMTP_HOST : process.env.EMAIL_SENDER_SMTP_HOST as string,
            SMTP_PORT : process.env.EMAIL_SENDER_SMTP_PORT as string,
            SMTP_USER : process.env.EMAIL_SENDER_SMTP_USER as string,
            SMTP_PASS : process.env.EMAIL_SENDER_SMTP_PASS as string,
            SMTP_FROM : process.env.EMAIL_SENDER_SMTP_FROM as string
        },
        GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET as string,
        CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME as string,
        CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY as string,
        CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET as string
    }

}

export const envVars = loadEnvVariables()