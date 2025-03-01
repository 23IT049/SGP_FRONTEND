import { useEffect, useState } from "react";
import BackButton from "../../UI/BackButton";

// Updated order data with new fields: pincode, mobile number, email, and country
const orderss = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjsvMvudj0MHGzqokU3SK61paazBRivuaIQ&s",
    item: "Limited Edition Stamp",
    username: "john_doe",
    totalAmount: "Rs.600",
    deliveryState: "Jammu",
    timeOfOrder: "2024-12-05 14:30",
    status: "Pick Up",
    deliveryAddress: "123, Jammu Road, Jammu",
    paymentMethod: "Credit Card",
    pincode: "180001",
    mobileNumber: "+91 9876543210",
    email: "john_doe@example.com",
    country: "India",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjsvMvudj0MHGzqokU3SK61paazBRivuaIQ&s",
    item: "Modern Commemorative Stamp",
    username: "jane_doe",
    totalAmount: "Rs.10",
    deliveryState: "Gujarat",
    timeOfOrder: "2024-12-04 10:15",
    status: "Pick Up",
    deliveryAddress: "45, Gujarat Nagar, Ahmedabad",
    paymentMethod: "Debit Card",
    pincode: "380001",
    mobileNumber: "+91 9123456789",
    email: "jane_doe@example.com",
    country: "India",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjsvMvudj0MHGzqokU3SK61paazBRivuaIQ&s",
    item: "Special Edition Stamp",
    username: "alex_smith",
    totalAmount: "Rs.400",
    deliveryState: "Punjab",
    timeOfOrder: "2024-12-03 12:45",
    status: "Pick Up",
    deliveryAddress: "78, Punjab Street, Ludhiana",
    paymentMethod: "UPI",
    pincode: "141001",
    mobileNumber: "+91 9345678901",
    email: "alex_smith@example.com",
    country: "India",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjsvMvudj0MHGzqokU3SK61paazBRivuaIQ&s",
    item: "Special Edition Stamp",
    username: "mary_jones",
    totalAmount: "Rs.400",
    deliveryState: "Bihar",
    timeOfOrder: "2024-12-02 17:00",
    status: "Pick Up",
    deliveryAddress: "56, Patna Road, Bihar",
    paymentMethod: "Net Banking",
    pincode: "800001",
    mobileNumber: "+91 9456123456",
    email: "mary_jones@example.com",
    country: "India",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(orderss);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store the selected order
  const ordersPerPage = 3;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);

  // Close popup when clicked outside
  const closePopup = () => setSelectedOrder(null);

  return (
    <div className="relative p-6 dark:bg-background-dark min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-primary-dark dark:text-text-dark mb-10">
        Orders
      </h1>
      <table className="min-w-full bg-white dark:bg-background-dark dark:text-white border border-gray-300 dark:border-gray-600 rounded">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Image</th>
            <th className="px-6 py-4 text-left font-semibold">Item</th>
            <th className="px-6 py-4 text-left font-semibold">Username</th>
            <th className="px-6 py-4 text-left font-semibold">Total Amount</th>
            <th className="px-6 py-4 text-left font-semibold">Delivery State</th>
            <th className="px-6 py-4 text-left font-semibold">Time of Order Placed</th>
            <th className="px-6 py-4 text-left font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr
              key={index}
              onClick={() => setSelectedOrder(order)} // Set the selected order when a row is clicked
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4">
                <img src={order.image} alt="Item" className="w-24" />
              </td>
              <td className="px-6 py-4">{order.item}</td>
              <td className="px-6 py-4">{order.username}</td>
              <td className="px-6 py-4">{order.totalAmount}</td>
              <td className="px-6 py-4">{order.deliveryState}</td>
              <td className="px-6 py-4">{order.timeOfOrder}</td>
              <td className="px-6 py-4 text-green-600 font-bold cursor-pointer">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

      {/* Popup for displaying the selected order details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-background-dark text-black dark:text-white p-8 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            <p><strong>Item:</strong> {selectedOrder.item}</p>
            <p><strong>Username:</strong> {selectedOrder.username}</p>
            <p><strong>Total Amount:</strong> {selectedOrder.totalAmount}</p>
            <p><strong>Delivery State:</strong> {selectedOrder.deliveryState}</p>
            <p><strong>Time of Order Placed:</strong> {selectedOrder.timeOfOrder}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Pincode:</strong> {selectedOrder.pincode}</p>
            <p><strong>Mobile Number:</strong> {selectedOrder.mobileNumber}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Country:</strong> {selectedOrder.country}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closePopup}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
