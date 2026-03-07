
import { UserStatus } from "../../../generated/prisma/enums";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";
import AppError from "../../errorHelpers/AppError";
import status from "http-status";
import { jwtUtils } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


interface IRegisterPatientPayload {
    name : string,
    email : string,
    password : string
}

interface ILoginUserPayload {
    email : string,
    password : string
}


const registerPatient = async (payload : IRegisterPatientPayload) =>{

    const {name , email , password} = payload;

    const data = await auth.api.signUpEmail({
        body:{
            name,
            email,
            password
        }
    })

    if(!data.user){
        throw new Error('User not found')
    }
    try {
        
    const patient = await prisma.$transaction(async (tx) =>{

        const patientTx = await tx.patient.create({
            data :{
                userId : data.user.id,
                name : payload.name,
                email : payload.email
            }
        })
        return patientTx
    })
    const accessToken = tokenUtils.getAccessToken({
        userId : data.user.id,
        email : data.user.email,
        role : data.user.role,
        name : data.user.name,
        status : data.user.status,
        isDeleted : data.user.isDeleted,
        emailVerified : data.user.emailVerified
    })


   const refreshToken = tokenUtils.getRefreshToken({
        userId : data.user.id,
        email : data.user.email,
        role : data.user.role,
        name : data.user.name,
        status : data.user.status,
        isDeleted : data.user.isDeleted,
        emailVerified : data.user.emailVerified
    })

    return {
        ...data,
        patient,
        accessToken,
        refreshToken
    }
    } catch (error) {
        console.log(error)
        await prisma.user.delete({
            where : {
                id: data.user.id
            }
        })
        throw error
    }
}

const loginUser = async (payload :ILoginUserPayload ) =>{

    const {email , password} = payload

    const data = await auth.api.signInEmail({
        body : {
            email,
            password
        }
    })

    if(data.user.status === UserStatus.BLOCKED){
        throw new Error ('User is blocked')
    }

    if(data.user.isDeleted || data.user.status === UserStatus.DELETED){
         throw new Error ("User is deleted")
    }

    const accessToken = tokenUtils.getAccessToken({
        userId : data.user.id,
        email : data.user.email,
        role : data.user.role,
        name : data.user.name,
        status : data.user.status,
        isDeleted : data.user.isDeleted,
        emailVerified : data.user.emailVerified
    })


   const refreshToken = tokenUtils.getRefreshToken({
        userId : data.user.id,
        email : data.user.email,
        role : data.user.role,
        name : data.user.name,
        status : data.user.status,
        isDeleted : data.user.isDeleted,
        emailVerified : data.user.emailVerified
    })
    return {
        ...data,
        accessToken,
        refreshToken
    }
        

}

const getMe = async(user : IRequestUser) =>{
    const userExists = await prisma.user.findUnique({
        where : {
            id : user.userId
        },
        include : {
            patient : {
                include : {
                    prescriptions : true,
                    appointments : true,
                    reviews : true,
                    medicalReports : true,
                    patientHealthData : true

                }
            },
            doctor : {
                include : {
                    specialties :true,
                    reviews : true,
                    appointments : true,
                    prescriptions : true
                }
            },
            admin : true
        }
    })
    if(!userExists){
        throw new Error('User not found')
    }
    return userExists
}

const getNewToken = async(refreshToken : string , sessionToken : string) =>{
     
    const isSessionTokenExists = await prisma.session.findUnique({
        where : {
            token : sessionToken
        },
        include : {
            user : true
        }
    })
    
    if(!isSessionTokenExists){
        throw new AppError(status.UNAUTHORIZED, "Unauthorized");
    }

    const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken , envVars.REFRESH_TOKEN_SECRET)

    if(!verifiedRefreshToken.success && verifiedRefreshToken.error){
        throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
    }

    const data = verifiedRefreshToken.data as JwtPayload

    const newAccessToken = tokenUtils.getAccessToken({
        userId : data.userId,
        email : data.email,
        role : data.role,
        name : data.name,
        status : data.status,
        isDeleted : data.isDeleted,
        emailVerified : data.emailVerified
    })
    const newRefreshToken = tokenUtils.getRefreshToken({
        userId : data.userId,
        email : data.email,
        role : data.role,
        name : data.name,
        status : data.status,
        isDeleted : data.isDeleted,
        emailVerified : data.emailVerified
    })

    const {token} = await prisma.session.update({
        where : {
            token : sessionToken
        },
        data : {
            token : newRefreshToken,
            expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1000),
            updatedAt: new Date(),
        }
    })
    return {
        accessToken : newAccessToken,
        refreshToken : newRefreshToken,
        sessionToken : token
    }
   
    
    
}

export const authService = {
    registerPatient,
    loginUser,
    getMe,
    getNewToken
}