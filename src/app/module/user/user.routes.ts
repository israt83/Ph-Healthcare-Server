import { Router } from "express";
import { userController } from "./user.controller";
import { createAdminZodSchema, createDoctorZodSchema } from "./user.validation";
import { validateRequest } from "../../middleware/validateRequest";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post(
  "/create-doctor",
  validateRequest(createDoctorZodSchema),
  userController.createDoctor,
);
router.post(
  "/create-admin",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(createAdminZodSchema),
  userController.createAdmin,
);

export const userRoutes = router;
