import express from "express";

import { IndexRoute } from "./app/routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notfound";
// import cors from "cors";


const app = express();

app.use(express.json())

app.use('/api/v1' , IndexRoute)

app.use(globalErrorHandler)
app.use(notFound)


export default app