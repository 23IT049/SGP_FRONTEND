import { useState } from "react";
import EventModal from "./EventModal";
import {toast} from "react-hot-toast";

const EventCard = ({ event, onApprove, onReject }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const EventActionButtons = ({ event, onApprove, onReject }) => {
    // Function to handle approval and show toast
    const handleApprove = (e, eventId) => {
      e.stopPropagation();
      onApprove(eventId);
      toast.success("Event Approved Successfully!"); // Show success toast
    };
  
    // Function to handle rejection and show toast
    const handleReject = (e, eventId) => {
      e.stopPropagation();
      onReject(eventId);
      toast.error("Event Rejected!"); 
    };

  return (
    <div className="p-4">
      <div
        className="flex flex-col bg-white dark:bg-background-dark shadow-lg rounded-lg overflow-hidden dark:shadow-md dark:shadow-shadow-dark cursor-pointer"
        onClick={showModal}
      >
        <div className="flex flex-col items-center justify-center bg-accent-light p-2 w-full">
          <span className="text-xs text-primary-light font-bold">
            {new Date(event.startDate)
              .toLocaleString("default", { month: "short" })
              .toUpperCase()}
          </span>
          <span className="text-2xl md:text-3xl text-primary-light dark:text-primary-light font-extrabold">
            {new Date(event.startDate).getDate()}
          </span>
        </div>

        <div className="flex flex-col p-4 flex-1">
          <div className="text-xs md:text-sm text-text-light dark:text-text-dark mb-1">
            {event.startTime || "All Day"} - {event.endTime || "All Day"}
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-primary-light mb-1">
            {event.title}
          </h3>
          <p className="text-xs md:text-sm text-text-light dark:text-text-dark mb-2">
            {event.description}
          </p>
          <div className="text-sm italic text-text-light dark:text-text-dark mb-3 md:mb-0">
            {event.location}
          </div>
        </div>

        {event && (
          <div className="flex justify-between p-4 dark:bg-background-dark rounded-b-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onApprove(event._id);
              }}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReject(event._id);
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        )}
      </div>

      <EventModal
        event={event}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
      />
    </div>
  );
};
};

export default EventCard;
