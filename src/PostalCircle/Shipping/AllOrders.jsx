import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../UI/BackButton";

const orders = [
  { orderId: "ORD12345", status: "Shipped", date: "2024-12-05" },
  { orderId: "ORD67890", status: "Shipped", date: "2024-12-06" },
  { orderId: "ORD54321", status: "Shipped", date: "2024-12-07" },
];

const AllOrders = () => {
  return (
    <div className="relative p-4">
      <BackButton />
      <div className="p-6 dark:bg-background-dark min-h-screen">
        <h1 className="text-3xl font-bold text-center text-primary-dark dark:text-text-dark mb-10">
          All Orders for Shipping
        </h1>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl bg-white dark:bg-background-dark dark:text-white dark:shadow-md dark:shadow-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-primary-dark dark:text-text-dark mb-6">
              Orders List
            </h2>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="p-4 bg-gray-100 dark:bg-accent-dark dark:text-black rounded-lg mb-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{`Order ID: ${order.orderId}`}</p>
                      <p className="text-sm text-gray-500">{`Date: ${order.date}`}</p>
                    </div>
                    <Link
                      to={`/postal/track-orders/${order.orderId}`}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
