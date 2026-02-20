import express from "express";

import { IndexRoute } from "./app/routes";
// import cors from "cors";


const app = express();

app.use(express.json())

app.use('/api/v1' , IndexRoute)


export default app