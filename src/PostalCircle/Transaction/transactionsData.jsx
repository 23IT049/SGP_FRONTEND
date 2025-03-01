import { useState } from "react";
import BackButton from "../../UI/BackButton";

// Sample transactions data with added payment method and status fields
const transactionsData = [
  {
    transactionId: "TXN001",
    postalCircle: "Jammu",
    sender: "John Doe",
    amount: "Rs. 1000",
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2024-12-05",
  },
  {
    transactionId: "TXN002",
    postalCircle: "Gujarat",
    sender: "Alex Smith",
    amount: "Rs. 500",
    paymentMethod: "Debit Card",
    status: "Completed",
    date: "2024-12-05",
  },
  {
    transactionId: "TXN003",
    postalCircle: "Jammu",
    sender: "Alice Cooper",
    amount: "Rs. 1500",
    paymentMethod: "UPI",
    status: "Completed",
    date: "2024-12-06",
  },
  {
    transactionId: "TXN004",
    postalCircle: "Punjab",
    sender: "Charlie Brown",
    amount: "Rs. 750",
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2024-12-06",
  },
];

const Transactions = () => {
  const [startDate, setStartDate] = useState(""); // Start date
  const [endDate, setEndDate] = useState(""); // End date
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Handle start date change
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Filter transactions based on the selected date range
  const filterTransactions = () => {
    if (startDate && endDate) {
      // Filter transactions where date is within the range and status is "Completed"
      const filtered = transactionsData.filter((txn) => {
        const txnDate = new Date(txn.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return txnDate >= start && txnDate <= end && txn.status === "Completed";
      });
      setFilteredTransactions(filtered);
    }
  };

  // Trigger filtering when dates are selected
  useState(() => {
    filterTransactions();
  }, [startDate, endDate]);

  return (
    <div className="relative p-6 dark:bg-background-dark min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-primary-dark dark:text-text-dark mb-10">
        Postal Circle Transactions
      </h1>

      {/* Date Range Picker */}
      <div className="mb-6 flex justify-center space-x-4">
        <div>
          <label className="text-lg font-medium text-primary-dark dark:text-text-dark mr-4">
            From Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="text-lg font-medium text-primary-dark dark:text-text-dark mr-4">
            To Date:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded"
          />
        </div>
        <button
          onClick={filterTransactions}
          className="px-6 py-2 bg-primary-dark text-white rounded"
        >
          Get
        </button>
      </div>

      {/* Display Transactions for the selected date range */}
      {filteredTransactions.length > 0 ? (
        <table className="min-w-full bg-white dark:bg-background-dark dark:text-white border border-gray-300 dark:border-gray-600 rounded">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Transaction ID</th>
              <th className="px-6 py-4 text-left font-semibold">Postal Circle</th>
              <th className="px-6 py-4 text-left font-semibold">Sender</th>
              <th className="px-6 py-4 text-left font-semibold">Amount</th>
              <th className="px-6 py-4 text-left font-semibold">Payment Method</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td className="px-6 py-4">{transaction.transactionId}</td>
                <td className="px-6 py-4">{transaction.postalCircle}</td>
                <td className="px-6 py-4">{transaction.sender}</td>
                <td className="px-6 py-4">{transaction.amount}</td>
                <td className="px-6 py-4">{transaction.paymentMethod}</td>
                <td className="px-6 py-4 text-green-600 font-bold">
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : startDate && endDate ? (
        <p className="text-center text-lg text-gray-500">
          No completed transactions found between {startDate} and {endDate}.
        </p>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Please select a date range to view completed transactions.
        </p>
      )}
    </div>
  );
};

export default Transactions;
