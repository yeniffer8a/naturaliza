import express from "express";
import "dotenv/config";
import connectDB from "./config/dB.js";
import apiRouter from "./routes/apiRouter.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use("", apiRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`the server is running on the port: ${port}`);
});
