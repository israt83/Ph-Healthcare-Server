import { Router} from "express";
import { userController } from "./user.controller";
import { createDoctorZodSchema } from "./user.validation";
import { validateRequest } from "../../middleware/validateRequest";




const router = Router();
router.post(
  "/create-doctor",
  validateRequest(createDoctorZodSchema),
  userController.createDoctor,
);

export const userRoutes = router;
