import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";
import config from "./config";
dotenv.config();

paypal.configure({
  mode: "sandbox", // Cambia a "live" en producción
  client_id: config.PAYPAL_CLIENT_ID,
  client_secret: config.PAYPAL_CLIENT_SECRET,
});

export default paypal;
