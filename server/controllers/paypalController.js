import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";

dotenv.config();

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});

export const createPayment = (req, res) => {
  const { total } = req.body;

  const paymentData = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    transactions: [{ amount: { total, currency: "USD" } }],
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
  };

  paypal.payment.create(paymentData, (error, payment) => {
    if (error) {
      res.status(500).json({ error: error.response });
    } else {
      res.json({ approvalUrl: payment.links[1].href });
    }
  });
};
