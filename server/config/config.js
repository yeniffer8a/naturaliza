import "dotenv/config";

export const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  PAYPAL_API: process.env.PAYPAL_API,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
};
