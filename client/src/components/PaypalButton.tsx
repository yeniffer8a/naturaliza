import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const PayPalButton = ({ total }: { total: number }) => {
  return (
    <PayPalButtons
      createOrder={async () => {
        const { data } = await axios.post(
          "http://localhost:3000/paypal/create-payment",
          { total }
        );
        return data.approvalUrl;
      }}
      onApprove={async (_data, actions) => {
        if (!actions) {
          console.error("Las acciones de pago no están disponibles.");
          return;
        }
        const details = await actions.order?.capture();
        console.log("Pago aprobado:", details);
      }}
    />
  );
};

export default PayPalButton;
