import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { updateDoctorZodSchema } from "./doctor.validate";
import { validateRequest } from "../../middleware/validateRequest";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);
router.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN , Role.ADMIN),
  validateRequest(updateDoctorZodSchema),
  DoctorController.updateDoctor,
);
router.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN , Role.ADMIN),
  DoctorController.deleteDoctor,
);

export const DoctorRoute = router;
