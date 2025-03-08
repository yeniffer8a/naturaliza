import PayPalButton from "./PaypalButton";

const Checkout = () => {
  return (
    <div className="container-section z-0">
      <PayPalButton total={100} />
    </div>
  );
};

export default Checkout;
