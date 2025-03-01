import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import { useEventContext } from "../../context/EventContext";

const Events = () => {
  const { approvedEvents } = useEventContext();
  const navigate = useNavigate();

  const displayedEvents = approvedEvents.slice(0, 2);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-primary-dark dark:text-text-dark mb-10">
        Upcoming Events
      </h1>

      <div className="flex flex-col md:flex-row">
        <div className="hidden w-full md:w-1/2 h-96 bg-gray-200 dark:bg-gray-700 md:flex items-center justify-center mb-6 md:mb-0">
          <p className="text-primary-dark dark:text-primary-light">
            Map Placeholder
          </p>
        </div>

        <div className="w-full md:w-1/2 px-4">
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <p className="text-center text-text-light dark:text-text-dark">
              No upcoming events.
            </p>
          )}

          {approvedEvents.length > 2 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/all-events")}
                className="bg-primary-dark text-white px-5 py-2 rounded-full hover:opacity-90 transition-colors"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
