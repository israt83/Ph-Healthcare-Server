import { Router } from "express";
import { SpecialtyRoute } from "../module/speciality/specialty.route";
import { AuthRoute } from "../module/auth/auth.route";
import { userRoutes } from "../module/user/user.routes";
import { DoctorRoute } from "../module/doctor/doctor.routes";

const router = Router();
router.use('/auth' ,AuthRoute)
router.use('/specialty',SpecialtyRoute)
router.use('/user', userRoutes)
router.use('/doctors', DoctorRoute)

export const IndexRoute = router