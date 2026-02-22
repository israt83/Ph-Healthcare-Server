import { userStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";


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

    // const patient = await prisma.$transaction(async () =>{

    //     await tx
    // })

    return data
}

const loginUser = async (payload :ILoginUserPayload ) =>{

    const {email , password} = payload

    const data = await auth.api.signInEmail({
        body : {
            email,
            password
        }
    })

    if(data.user.status === userStatus.BLOCKED){
        throw new Error ('User is blocked')
    }

    if(data.user.isDeleted || data.user.status === userStatus.DELETED){
         throw new Error ("User is deleted")
    }

    return data
        

}

export const authService = {
    registerPatient,
    loginUser
}