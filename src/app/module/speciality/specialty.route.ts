import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post("/", SpecialtyController.createSpecialty)
router.get("/",checkAuth(Role.ADMIN), SpecialtyController.getSpecialties)
router.patch("/:id", SpecialtyController.updateSpecialty)
router.delete("/:id", SpecialtyController.deleteSpecialty)


export const SpecialtyRoute = router