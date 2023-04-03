import express from "express";
import 'dotenv/config';
import { json } from "body-parser";
import routes from "./routes/v1";

const app = express()
app.use(json())
app.use('/api/v1', routes);

export default app