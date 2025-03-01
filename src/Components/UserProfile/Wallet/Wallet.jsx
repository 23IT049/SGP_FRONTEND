import { useEffect, useState } from "react";
import { useWallet } from "../../../context/WalletContext";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import {toast} from "react-hot-toast";

const Wallet = ({ onClose, currUser }) => {
  const { walletBalance } = useWallet();
  const [isAddingBalance, setIsAddingBalance] = useState(false);
  const { getCurrentUserDetails } = useAuth(); // Function to fetch user details
  const [currUserDetails, setCurrUserDetails] = useState(null); // State to store user details

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddBalanceClick = () => {
    setIsAddingBalance(true);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    setAmount(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch current user details
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getCurrentUserDetails();
        setCurrUserDetails(userDetails);
      } catch (err) {
        console.error("Error fetching current user details:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleAddMoney = async (e) => {
    e.preventDefault();

    const parsedAmount = parseInt(amount);

    try {
      setIsProcessing(true);

      // Step 1: Create payment intent
      const response = await axios.post(
        "http://localhost:5000/api/wallet/create-payment-intent",
        {
          amount: parsedAmount,
          email: currUserDetails?.email, 
          userId: currUserDetails?._id, 
        }
      );

      const paymentLink = response.data?.url;
      if (paymentLink) {
        toast.success("Payment link created successfully! Redirecting...");
        window.location.href = paymentLink;
      } else {
        throw new Error("Payment link not found.");
      }
    } catch (err) {
      console.error("Error creating payment intent:", err);
      toast.error("Failed to create a payment link. Please try again.");
      setError("Failed to create a payment link. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-background-dark dark:bg-opacity-80">
      <div className="w-full max-w-md p-6 rounded-lg text-center relative bg-white dark:bg-background-dark border border-border-light dark:border-border-dark shadow-lg dark:shadow-[0px_0px_15px_var(--tw-shadow-dark)]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded transition text-black dark:text-primary-dark text-xl font-bold hover:bg-accent-dark dark:hover:bg-accent-dark"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-accent-light dark:text-accent-dark">
          Hi {currUserDetails?.name || "User"}
        </h2>

        <div className="text-center py-4 border-2 border-dashed rounded-lg border-border-light dark:border-border-dark bg-accent-light/10 dark:bg-accent-dark/10">
          <h3 className="text-2xl font-bold mb-1 text-primary-dark dark:text-primary-dark">
            💰 Available Balance
          </h3>
          <span className="text-4xl font-bold text-accent-light dark:text-accent-dark">
            ₹{walletBalance || currUserDetails?.wallet_balance || "0"}
          </span>
        </div>

        {!isAddingBalance ? (
          <button
            onClick={handleAddBalanceClick}
            className="mt-4 px-6 py-2 font-medium rounded text-primary-light dark:text-primary-dark bg-accent-light dark:bg-accent-dark hover:text-primary-light dark:hover:text-primary-dark hover:opacity-90"
          >
            Add Balance
          </button>
        ) : (
          <form onSubmit={handleAddMoney} className="mt-4 space-y-4">
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
                isProcessing
                  ? "bg-accent-light dark:bg-accent-dark cursor-not-allowed opacity-50"
                  : "bg-input-light-default dark:bg-input-dark-default hover:bg-input-light-focus dark:hover:bg-input-dark-focus"
              }`}
              disabled={isProcessing || !amount}
            >
              {isProcessing ? "Processing..." : "Confirm Add Balance"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Wallet;
