import EventCard from "./EventCard";
import BackButton from "../../UI/BackButton";
import AllEvents from "../../Components/Events/AllEvents";
import { useEventContext } from "../../context/EventContext";
import axios from "axios";

const Event = () => {
  let { events, setTemp } = useEventContext();
  console.log(events);
  const handleApprove = (id) => {
    console.log(id);
    const token = localStorage.getItem("token");
    console.log("aprrove button",token);

    axios
  .put(
    `http://localhost:5000/api/admin/approve-event/${id}`,
    {}, // Pass an empty object as the data if no body is required
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the Authorization header
      },
    }
  )
  .then((res) => {
    console.log("approved", res.data);
    setTemp((prev) => !prev); // Trigger re-render by toggling a state
  })
  .catch((err) => console.log(err));

  };

  const handleReject = (id) => {
    console.log(id);
    const token = localStorage.getItem("token");
    console.log("aprrove button",token);

    axios
  .put(
    `http://localhost:5000/api/admin/reject-event/${id}`,
    {}, // Pass an empty object as the data if no body is required
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the Authorization header
      },
    }
  )
  .then((res) => {
    console.log("approved", res.data);
    setTemp((prev) => !prev); // Trigger re-render by toggling a state
  })
  .catch((err) => console.log(err));

    // Handle rejection logic here, similar to approval
  };

  return (
    <div className="relative p-4">
      <BackButton />
      <div className="p-6">
        <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark md:mb-5 md:mt-0 mt-3 mb-5">
          Event Approval
        </h1>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 font-bold dark:text-gray-300">
            No events for approval
          </div>
        )}
      </div>
      <AllEvents />
    </div>
  );
};

export default Event;
