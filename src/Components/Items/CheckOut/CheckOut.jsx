import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [editingAddress, setEditingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  console.log("inside checkout:", token);
  
  // const cartItems = [
  //   { id: 1, name: "Product 1", price: 100, quantity: 2 },
  //   { id: 2, name: "Product 2", price: 200, quantity: 1 },
  // ];

  // const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleEditAddress = () => {
    setEditingAddress(true);
  };

  const handleSaveAddress = (newAddress) => {
    setSelectedAddress(newAddress);
    setEditingAddress(false);
  };

  const handlePlaceOrder =async () => {
    if (!selectedAddress || !paymentMethod) {
      toast.error("Please select an address and payment method before placing the order.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Make API call to process payment and create order
      const response = await axios.post(
        'http://localhost:5000/api/payment/checkout',{},
        {
          // Include authorization token in headers
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      ).then((response) => {
        console.log(response.data);
        navigate("/")
      });

      // Handle successful order placement
      // alert(`Order placed successfully! Order ID: ${response.data.orderId}`);
      toast.success("Order Placed successfully");
      // Optional: Redirect or clear cart
      // history.push('/orders'); // If using React Router
      // clearCart(); // If using a cart context

    } catch (error) {
      // Handle errors
      setError(error.response?.data?.message || 'An error occurred while placing the order');
      console.error('Order placement error:', error);
      toast.error(error.response?.data?.message || 'Failed To Place Order');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto h-min-screen">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Address Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">1. Delivery Address</h2>
        {!editingAddress && (
          <div>
            <button
              className="block w-full p-4 border rounded mb-2 text-left"
              onClick={() =>
                setSelectedAddress({
                  street: "123 Main St",
                  city: "New York",
                  state: "NY",
                  zip: "10001",
                })
              }
            >
              <p>123 Main St, New York, NY 10001</p>
            </button>
            <button
              className="mt-2 py-2 px-4 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleEditAddress}
            >
              Edit Address
            </button>
          </div>
        )}
        {editingAddress && (
          <div className="border p-4 rounded">
            <p className="mb-2">Edit Address:</p>
            <input
              type="text"
              placeholder="Street"
              className="block w-full mb-2 p-2 border rounded"
              defaultValue={selectedAddress?.street || ""}
              onChange={(e) => (selectedAddress.street = e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="block w-full mb-2 p-2 border rounded"
              defaultValue={selectedAddress?.city || ""}
              onChange={(e) => (selectedAddress.city = e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              className="block w-full mb-2 p-2 border rounded"
              defaultValue={selectedAddress?.state || ""}
              onChange={(e) => (selectedAddress.state = e.target.value)}
            />
            <input
              type="text"
              placeholder="ZIP Code"
              className="block w-full mb-2 p-2 border rounded"
              defaultValue={selectedAddress?.zip || ""}
              onChange={(e) => (selectedAddress.zip = e.target.value)}
            />
            <button
              className="mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => handleSaveAddress(selectedAddress)}
            >
              Save Address
            </button>
          </div>
        )}
      </div>

      {/* Payment Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">2. Payment Method</h2>
        <button
          className={`block w-full p-4 border rounded mb-2 ${paymentMethod === "Credit Card" ? "bg-blue-100" : ""}`}
          onClick={() => setPaymentMethod("Credit Card")}
        >
          Pay with Credit Card
        </button>
        <button
          className={`block w-full p-4 border rounded mb-2 ${paymentMethod === "PayPal" ? "bg-blue-100" : ""}`}
          onClick={() => setPaymentMethod("PayPal")}
        >
          Pay with PayPal
        </button>
      </div>

      {/* Summary Section */}
      <div className="mb-6">
        <button
        className={`w-full py-2 ${
          !selectedAddress || !paymentMethod || loading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        onClick={handlePlaceOrder}
        disabled={!selectedAddress || !paymentMethod || loading}
      >
        {loading ? 'Processing Order...' : 'Place Order'}
      </button>
      </div>
    </div>
  );
};

export default Checkout;
