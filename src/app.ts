import express from "express";
import 'dotenv/config';
import { json } from "body-parser";
import routes from "./routes/v1";
import swaggerDocument from "./docs/swagger";
import swaggerUi from 'swagger-ui-express'
const app = express()
app.use(json())
app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app