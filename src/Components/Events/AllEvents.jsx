import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useEventContext } from "../../context/EventContext";
import BackButton from "../../UI/BackButton";
import { useAuth } from "../../context/AuthContext";
import EventFormModal from "./EventFormModal";
import { FaPlus } from "react-icons/fa6";

const AllEvents = () => {
  const { approvedEvents } = useEventContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const eventsPerPage = 3;
  const totalPages = Math.ceil(approvedEvents.length / eventsPerPage);
  const { user } = useAuth();

  // let user = "postal"
  console.log(user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentEvents = approvedEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="relative p-4">
      {user !== "admin" ? <BackButton /> : ""}

      {(user === "mediator" || user === "postalCircle") && (
        <button
          className="bg-primary-dark flex items-center text-primary-light py-2 px-4 rounded-lg hover:opacity-90 transition absolute top-5 right-5"
          onClick={openModal}
        >
          <FaPlus className="mr-2" /> Create Event
        </button>
      )}
      <div className="container mx-auto md:py-5">
        <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark md:mb-3 md:mt-0 mt-12 mb-5">
          All Events
        </h1>

        <div className="flex flex-col md:flex-row gap-6 md:p-4">
          <div className="hidden w-full md:w-1/2 max-h-96 bg-gray-200 dark:bg-gray-700 md:flex items-center justify-center">
            <p className="text-primary-dark dark:text-primary-light">
              Map Placeholder
            </p>
          </div>

          <div className="w-full md:w-1/2">
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="text-center text-text-light dark:text-text-dark">
                No events available.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={prevPage}
            className="bg-primary-dark text-primary-light py-2 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-primary-dark dark:text-text-dark">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            className="bg-primary-dark text-primary-light py-2 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        {(user === "mediator" || user === "postalCircle") && (
          <EventFormModal showModal={showModal} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default AllEvents;
