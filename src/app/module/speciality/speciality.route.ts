import { Router } from "express";
import { SpecialityController } from "./speciality.controller";


const router = Router();

router.post("/", SpecialityController.createSpeciality)
router.get("/", SpecialityController.getSpeciality)
router.patch("/:id", SpecialityController.updateSpeciality)
router.delete("/:id", SpecialityController.deleteSpeciality)


export const SpecialityRoute = router