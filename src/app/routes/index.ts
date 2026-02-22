import { Router } from "express";
import { SpecialityRoute } from "../module/speciality/speciality.route";
import { AuthRoute } from "../module/auth/auth.route";

const router = Router();
router.use('/auth' ,AuthRoute)
router.use('/speciality',SpecialityRoute)

export const IndexRoute = router