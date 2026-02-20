import { Router } from "express";
import { SpecialityRoute } from "../module/speciality/speciality.route";

const router = Router();

router.use('/speciality',SpecialityRoute)

export const IndexRoute = router