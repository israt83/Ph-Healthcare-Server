import { Request  , Response} from "express";
import { SpecialityService } from "./speciality.service";

const createSpeciality = async(req : Request, res : Response)  =>{
    try {
        const payload = req.body;
    
    const result = await SpecialityService.createSpeciality(payload)
    return res.status(200).json({
        success : true,
        message : "Speciality created successfully",
        data : result
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error
        })
    }
}

const getSpeciality = async(req : Request, res : Response) =>{
    try {
        const result = await SpecialityService.getSpeciality()
        return res.status(200).json({
            success : true,
            message : "Speciality fetched successfully",
            data : result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error
        })
    }
}

const updateSpeciality = async(req : Request, res : Response) =>{
    try {
        const {id} = req.params
        const result = await SpecialityService.updateSpeciality(id as string , req.body)
        return res.status(200).json({
            success : true,
            message : "Speciality updated successfully",
            data : result
        })
    } catch (error) {
         console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error
        }) 
    }
}

const deleteSpeciality = async(req : Request, res : Response) =>{
    try {
        const {id} = req.params
        const result = await SpecialityService.deleteSpeciality(id as string)
        return res.status(200).json({
            success : true,
            message : "Speciality deleted successfully",
            data : result
        })
    } catch (error) {
       console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error
        }) 
    }
}

export const SpecialityController = {
    createSpeciality,
    getSpeciality,
    updateSpeciality,
    deleteSpeciality
}