import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/dB.js";
import apiRouter from "./routes/apiRouter.js";
import cors from "cors";
import bodyParser from "body-parser";
//import swaggerSpec from "./swagger.js";

import swagger from './swagger.json' with { type: "json" };

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use("", apiRouter);
app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swagger))

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`the server is running on the port: ${port}`);
});
