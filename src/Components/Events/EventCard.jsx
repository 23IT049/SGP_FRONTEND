import { useState } from "react";
import EventModal from "./EventModal";

const EventCard = ({ event }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div
        className="flex flex-col md:flex-row bg-white dark:bg-background-dark shadow-lg rounded-lg overflow-hidden mb-4 cursor-pointer"
        onClick={showModal} 
      >
        <div className="flex flex-col items-center justify-center bg-accent-light p-2 md:p-4 w-full md:w-20">
          <span className="text-xs text-primary-light font-bold">
            {new Date(event.startDate)
              .toLocaleString("default", { month: "short" })
              .toUpperCase()}
          </span>
          <span className="text-2xl md:text-3xl text-primary-light dark:text-primary-light font-extrabold">
            {new Date(event.startDate).getDate()}
          </span>
        </div>

        <div className="flex flex-col md:flex-row flex-1 p-4">
          <div className="flex-1">
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

          <div className="relative w-full md:w-1/3 flex-shrink-0 flex items-center justify-center md:h-full">
            <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md">
              {event.postedDate}
            </div>
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="rounded-lg object-cover w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
      <EventModal
        event={event}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default EventCard;
