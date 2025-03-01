import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../UI/BackButton";

const allOrders = {
  ORD12345: {
    trackingSteps: [
      { status: "Pick Up", date: "2024-12-05 14:30", completed: true },
      { status: "In Transit", date: "2024-12-06 10:00", completed: true },
      {
        status: "Out for Delivery",
        date: "2024-12-06 15:00",
        completed: false,
      },
      { status: "Delivered", date: "", completed: false },
    ],
  },
  ORD67890: {
    trackingSteps: [
      { status: "Pick Up", date: "2024-12-06 09:30", completed: true },
      { status: "In Transit", date: "2024-12-07 12:00", completed: false },
      { status: "Out for Delivery", date: "", completed: false },
      { status: "Delivered", date: "", completed: false },
    ],
  },
  ORD54321: {
    trackingSteps: [
      { status: "Pick Up", date: "2024-12-06 09:30", completed: true },
      { status: "In Transit", date: "2024-12-07 12:00", completed: false },
      { status: "Out for Delivery", date: "", completed: true },
      { status: "Delivered", date: "", completed: true },
    ],
  },
};

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (allOrders[id]) {
      setOrder(allOrders[id]);
    } else {
      navigate("/postal/track-orders");
    }
  }, [id, navigate]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative p-6 dark:bg-background-dark min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-primary-dark dark:text-text-dark mb-10">
        Order Tracking - {id}
      </h1>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white dark:bg-background-dark dark:text-white dark:shadow-md dark:shadow-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary-dark dark:text-text-dark mb-6">
            Order Status
          </h2>

          <div className="relative pt-4">
            <div className="flex justify-between mb-6">
              {order.trackingSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                      step.completed
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step.completed ? (
                      <span className="text-white">&#10003;</span>
                    ) : (
                      <span className="text-gray-500">{index + 1}</span>
                    )}
                  </div>
                  <div className="ml-4 text-sm">
                    <p className="font-medium">{step.status}</p>
                    <p className="text-xs text-gray-500">
                      {step.date || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute top-2 left-2 right-2 h-1 bg-gray-300">
              {order.trackingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-${
                    (index / (order.trackingSteps.length - 1)) * 100
                  }% w-1.5 h-1.5 rounded-full ${
                    step.completed ? "bg-green-600" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {order.trackingSteps.map((step, index) => (
              <div
                key={index}
                className={`dark:text-black p-4 ${
                  step.completed ? "bg-green-100" : "bg-gray-100"
                } rounded-lg mb-4`}
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{step.status}</p>
                  <p className="text-xs text-gray-500">{step.date || "N/A"}</p>
                </div>
                <p className="text-sm text-gray-700">
                  {step.completed ? "Completed" : "In Progress"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
