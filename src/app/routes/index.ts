import { Router } from "express";
import { SpecialtyRoute } from "../module/speciality/specialty.route";
import { AuthRoute } from "../module/auth/auth.route";
import { userRoutes } from "../module/user/user.routes";

const router = Router();
router.use('/auth' ,AuthRoute)
router.use('/specialty',SpecialtyRoute)
router.use('/user', userRoutes)

export const IndexRoute = router