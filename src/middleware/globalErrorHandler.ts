/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response , NextFunction} from "express";
import { envVars } from "../config/env";
import status from "http-status";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (error : any , req : Request , res : Response , next : NextFunction) =>{
    if(envVars.NODE_ENV === "development"){
        console.log("Error from global error handler",error)
    }

    const statusCode : number = status.INTERNAL_SERVER_ERROR;
    const message : string = "Something went wrong";


    res.status(statusCode).json({
        success : false,
        message : message,
        error
    })
    
}