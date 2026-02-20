import { Speciality } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpeciality = async(payload : Speciality) : Promise<Speciality> => {
    const speciality = await prisma.speciality.create({
        data : payload
    })
    return speciality;
}

const getSpeciality = async() : Promise<Speciality[]> =>{
    const speciality = await prisma.speciality.findMany()
    return speciality
}

const updateSpeciality = async (id : string , payload : Speciality) =>{
    const speciality = await prisma.speciality.update({
        where : {id},
        data : payload

    })
    return speciality
}

const deleteSpeciality = async(id : string) =>{
    const speciality = await prisma.speciality.delete({
        where :{
            id
        }
    })
    return speciality
}


export const SpecialityService ={
    createSpeciality,
    getSpeciality,
    updateSpeciality,
    deleteSpeciality
}