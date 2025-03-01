const CheckoutButton = ({ handlePlaceOrder }) => {
  return (
    <button
      onClick={handlePlaceOrder}
      className="w-full bg-primary-dark text-white py-3 rounded-lg font-bold hover:opacity-90"
    >
      Place Order
    </button>
  );
};

export default CheckoutButton;
