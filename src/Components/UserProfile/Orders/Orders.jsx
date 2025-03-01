import { useEffect, useState } from "react";
import BackButton from "../../../UI/BackButton";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 3;
  const { currUser } = useAuth();

  const token = localStorage.getItem("token");
  console.log("curr",currUser);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/orderHistory`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.orderHistory);
        setOrders(res.data.orderHistory || []); // Handle null response
      })
      .catch((err) => {
        console.error(err);
        setOrders([]); // Set to an empty array on error
      });
  }, [currUser, token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);

  return (
    <div className="relative p-6 dark:bg-background-dark min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-primary-dark dark:text-text-dark mb-10">
        Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No orders found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white dark:bg-background-dark dark:text-white p-4 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600"
              >
                <img
                  src={order.items[0]?.philatelicItem?.image}
                  alt="Philatelic item"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">
                  {order.items[0]?.philatelicItem?.name || "Unnamed Item"}
                </h2>
                {/* <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Postal Circle:</strong> {order.postalCircle?.name || "Unknown"}
                </p> */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Price:</strong> Rs.{order.items[0]?.price || "N/A"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Status:</strong> {order.orderStatus || "N/A"}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {orders.length > ordersPerPage && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm font-medium border rounded ${
                  currentPage === 1
                    ? "text-gray-400 bg-gray-200 dark:bg-gray-600"
                    : "text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 text-sm font-medium border rounded ${
                    currentPage === i + 1
                      ? "bg-border-dark text-white"
                      : "text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm font-medium border rounded ${
                  currentPage === totalPages
                    ? "text-gray-400 bg-gray-200 dark:bg-gray-600"
                    : "text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
