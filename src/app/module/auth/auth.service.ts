
import { UserStatus } from "../../../generated/prisma/enums";
import { IRequestUser } from "../../interfaces/requestUser.interface";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";


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

export const authService = {
    registerPatient,
    loginUser,
    getMe
}