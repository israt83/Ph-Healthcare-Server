import { Router} from "express";
import { userController } from "./user.controller";
import { createDoctorZodSchema } from "./user.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";




const router = Router();
router.post(
  "/create-doctor",
  validateRequest(createDoctorZodSchema),
  userController.createDoctor,
);
router.post("/create-admin", checkAuth(Role.SUPER_ADMIN),userController.createAdmin)

export const userRoutes = router;
