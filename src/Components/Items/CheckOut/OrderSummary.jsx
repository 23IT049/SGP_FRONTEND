import { useCart } from "../../../context/CartContext";

const OrderSummary = ({ activeSection, isPaymentConfirmed, openSection }) => {

  const {cart} = useCart();
  console.log(cart)

  return (
    <div className="mb-4">
      <h2
        className="text-xl font-semibold mb-2 cursor-pointer text-primary-dark dark:text-accent-dark"
        onClick={() => openSection("summary")}
      >
        3. Items and Delivery
      </h2>
      {activeSection === "summary" && isPaymentConfirmed && (
        <div className="dark:text-white">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>{item.PhilatelicItem.name} (x{item.quantity})</span>
                <span>₹{item.PhilatelicItem.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-lg mt-4">
            Total: ₹{cart.reduce((total, item) => total + item.PhilatelicItem.price * item.quantity, 0)}
          </div>
        </div>
       )}
    </div>
  );
};

export default OrderSummary;
