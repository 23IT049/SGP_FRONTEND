import { useState } from "react";
import axios from "axios";
import { useCart } from "../../../context/CartContext";

const PaymentSection = ({ activeSection, openSection }) => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const token = localStorage.getItem("token");
  const { cart } = useCart();

  const createPayloadFromCart = () => {
    const groupedByPostalCircle = {};
  
    // Group items by their postalCircleId
    cart.forEach((cartItem) => {
      const postalCircleId = cartItem.PhilatelicItem.postal_circle;
      if (!groupedByPostalCircle[postalCircleId]) {
        groupedByPostalCircle[postalCircleId] = [];
      }
      groupedByPostalCircle[postalCircleId].push({
        philatelicItem: cartItem.PhilatelicItem._id,
        quantity: cartItem.quantity,
        price: cartItem.PhilatelicItem.price,
      });
    });
  
    // Convert grouped items into an array for backend processing
    const payload = Object.entries(groupedByPostalCircle).map(
      ([postalCircleId, items]) => ({
        postalCircleId,
        items,
      })
    );
  
    return payload;
  };
  
  const handleStripePayment = async () => {
    try {
      setLoading(true);
      setResponseMessage(null);
  
      // Prepare the grouped payload dynamically from the cart
      const groupedPayload = createPayloadFromCart();
      console.log("Payload being sent:", groupedPayload);
  
      // Make an API call for each postal circle group
      for (const group of groupedPayload) {
        const response = await axios.post(
          "http://localhost:5000/api/payment/checkout",
          {
            ...group, // { postalCircleId, items }
            paymentMethod: "stripe",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.url) {
          // Redirect to Stripe Checkout
          window.location.href = response.data.url;
          break; // Redirect to checkout after the first group (if needed)
        }
      }
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "An error occurred while processing payment."
      );
      console.error("Stripe Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="mb-4">
      <h2
        className="text-xl font-semibold mb-2 cursor-pointer text-primary-dark dark:text-accent-dark"
        onClick={() => openSection("payment")}
      >
        2. Payment Method
      </h2>

      {activeSection === "payment" && (
        <div>
          <p className="text-gray-700 dark:text-white mb-4">
            Click below to make a payment using Stripe.
          </p>

          <button
            className={`py-2 px-4 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-accent-light text-white hover:opacity-90"
            }`}
            onClick={handleStripePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay with Stripe"}
          </button>

          {responseMessage && (
            <p className="mt-4 text-red-500 dark:text-red-400">{responseMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
