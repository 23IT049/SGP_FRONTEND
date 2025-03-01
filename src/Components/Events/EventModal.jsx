import { Modal, Button } from "antd";

const EventModal = ({ event, isModalVisible, handleCancel }) => {
  // console.log(event)
  return (
    <Modal
      title={event.title}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} className="bg-primary-dark text-white">
          Close
        </Button>,
      ]}
      className="dark:bg-background-dark dark:text-text-light text-white"
    >
      <div className="flex flex-col md:flex-row dark:bg-background-dark text-white">
        <div className="flex flex-col flex-1 mb-4 dark:bg-background-dark text-white">
          <div className="text-sm mb-1 text-text-light dark:text-text-dark">
            <strong>Date: </strong>
            {new Date(event.startDate).toLocaleDateString()} 
          </div>
          <div className="text-sm mb-1 text-text-light dark:text-text-dark">
            <strong>Time: </strong>
            {event.startTime || "All Day"} - {event.endTime || "All Day"}
          </div>
          <div className="text-sm mb-1 text-text-light dark:text-text-dark">
            <strong>Postal-Circle: </strong>
            {event.postal_circle.name}
          </div>
          <div className="text-sm mb-1 text-text-light dark:text-text-dark">
            <strong>Location: </strong>
            {event.location}
          </div>
          <p className="text-sm mb-2 text-text-light dark:text-text-dark">
            <strong>Description: </strong>
            {event.description}
          </p>
          {event.registrationLink && (
            <div className="mt-4">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Register Now
              </a>
            </div>
          )}
        </div>

        <div className="relative w-full md:w-1/3 flex-shrink-0 flex items-center justify-center">
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="rounded-lg object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
