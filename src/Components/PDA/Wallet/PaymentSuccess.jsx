import { useEffect, useState } from "react";
import { useWallet } from "../../../context/WalletContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();
  const { walletBalance, setWalletBalance } = useWallet();
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');


  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      if (!sessionId) {
        setError("Missing session ID. Unable to verify payment.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/wallet/success?session_id=${sessionId}`,{
          headers : { Authorization: `Bearer ${token}`}
        });

        console.log(response.data)

        if (response.data.payment_status === "paid") {
          const amount = parseInt(response.data.amount);
          const updatedBalance = walletBalance + amount;
          // if (amount) {
          //   await handlePostPaymentCallback(response.data);
          // }
          setWalletBalance(updatedBalance);

          navigate("/", { state: { success: true } });
        } else {
          setError("Payment verification failed. Please contact support.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setError("Failed to verify payment. Please try again.");
      }
    };

    verifyPayment();
  }, [navigate, walletBalance, setWalletBalance]);

  return (
    <div className="flex flex-col items-center mt-10">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-green-500">Verifying payment, please wait...</p>
      )}
    </div>
  );
}

export default PaymentSuccess;