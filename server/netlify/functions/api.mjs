import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch((err) => console.error("🔴 Error en MongoDB:", err));

// Ruta de prueba
app.get("/hello", (req, res) => {
  res.json({ message: "¡Hola desde Netlify Functions con Express y MongoDB!" });
});

// Exportar como función de Netlify
export const handler = serverless(app);
