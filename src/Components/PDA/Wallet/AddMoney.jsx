import { useEffect, useState } from "react";
import BackButton from "../../../UI/BackButton";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

function AddMoney() {

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { currUser } = useAuth();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    setAmount(value);
    if (value && (parseInt(value) < 200 || parseInt(value) > 10000)) {
      setError("Amount should be between ₹200 and ₹10,000");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddMoney = async (e) => {
    e.preventDefault();

    const parsedAmount = parseInt(amount);
    if (parsedAmount < 200 || parsedAmount > 10000) {
      setError("Please enter an amount between ₹200 and ₹10,000.");
      return;
    }

    try {
      setIsProcessing(true);

      // Step 1: Create payment intent
      const response = await axios.post(
        "http://localhost:5000/api/wallet/create-payment-intent",
        {
          amount: parsedAmount,
          email: currUser.email,
          userId: currUser._id,
        }
      );

      const paymentLink = response.data?.url;
      if (paymentLink) {
        window.location.href = paymentLink;
      } else {
        throw new Error("Payment link not found.");
      }
    } catch (err) {
      console.error("Error creating payment intent:", err);
      setError("Failed to create a payment link. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative">
      <BackButton />
      <div className="flex flex-col items-center mt-10 mb-40 bg-background-light dark:bg-background-dark">
        <div className="bg-white mt-16 dark:bg-background-dark shadow-lg dark:shadow-shadow-dark rounded-lg p-6 md:w-full w-72 max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-primary-dark dark:text-text-dark">
            Add Money to Wallet
          </h2>

          <form onSubmit={handleAddMoney} className="space-y-4">
            <div>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount (₹)"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-input-light-focus dark:focus:ring-input-dark-focus border-input-light-border dark:border-input-dark-border bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
              />
              {error && (
                <p className="text-accent-light dark:text-accent-dark text-sm mt-2">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-white ${
                amount >= 200 && amount <= 10000 && !isProcessing
                  ? "bg-input-light-default dark:bg-input-dark-default hover:bg-input-light-focus dark:hover:bg-input-dark-focus"
                  : "bg-accent-light dark:bg-accent-dark dark:text-primary-dark cursor-not-allowed opacity-50"
              }`}
              disabled={
                isProcessing ||
                parseInt(amount) < 200 ||
                parseInt(amount) > 10000
              }
            >
              {isProcessing ? "Processing..." : "Add Money"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMoney;
