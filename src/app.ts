import express from "express";
import 'dotenv/config';
import { json } from "body-parser";

const app = express()
app.use(json())

export default app