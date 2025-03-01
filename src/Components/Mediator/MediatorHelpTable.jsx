import { useState } from "react";
import SortIcon from "../../Admin/Postal-Circle/AllPostalCircle/SortIcon";
import { FaPlus } from "react-icons/fa";

const MediatorHelpTable = ({ data, handleSort, sortConfig, setHelpRequests }) => {
  const [response, setResponse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentRequestIndex, setCurrentRequestIndex] = useState(null);

  const handleOpenInput = (index) => {
    setCurrentRequestIndex(index);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setResponse(e.target.value);
  };

  const handleResolve = () => {
    setHelpRequests((prevRequests) =>
      prevRequests.map((request, index) =>
        index === currentRequestIndex
          ? { ...request, status: "Resolved" }
          : request
      )
    );
    setShowModal(false);
    setResponse("");
  };  

  const handleCloseModal = () => {
    setShowModal(false);
    setResponse("");
  };

  return (
    <div>
      <table className="w-full border-collapse border border-border-light dark:text-text-dark dark:border-border-dark shadow-lg rounded-lg overflow-hidden mt-10">
        <thead className="text-white">
          <tr className="bg-accent-light">
            <th
              className="py-2 px-4 border border-border-light dark:border-border-dark cursor-pointer"
              onClick={() => handleSort("username")}
            >
              Username <SortIcon sortKey="username" sortConfig={sortConfig} />
            </th>
            <th
              className="py-2 px-4 border border-border-light dark:border-border-dark cursor-pointer"
              onClick={() => handleSort("description")}
            >
              Description{" "}
              <SortIcon sortKey="description" sortConfig={sortConfig} />
            </th>
            <th
              className="py-2 px-4 border border-border-light dark:border-border-dark cursor-pointer"
              onClick={() => handleSort("postalCircleName")}
            >
              Postal Circle Name{" "}
              <SortIcon sortKey="postalCircleName" sortConfig={sortConfig} />
            </th>
            <th
              className="py-2 px-4 border border-border-light dark:border-border-dark cursor-pointer"
              onClick={() => handleSort("orderName")}
            >
              Order Name{" "}
              <SortIcon sortKey="orderName" sortConfig={sortConfig} />
            </th>
            <th
              className="py-2 px-4 border border-border-light dark:border-border-dark cursor-pointer"
              onClick={() => handleSort("time")}
            >
              Time <SortIcon sortKey="time" sortConfig={sortConfig} />
            </th>
            <th
              className="py-2 px-4 border border-border-light dark:border-border-dark cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status <SortIcon sortKey="status" sortConfig={sortConfig} />
            </th>
            <th className="py-2 px-4 border border-border-light dark:border-border-dark">
              Resolve
            </th>
          </tr>
        </thead>
        <tbody className="text-text-light dark:text-text-dark">
          {data.length > 0 ? (
            data.map((request, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border border-border-light dark:border-border-dark">
                  {request.username}
                </td>
                <td className="py-2 px-4 border border-border-light dark:border-border-dark">
                  {request.description}
                </td>
                <td className="py-2 px-4 border border-border-light dark:border-border-dark">
                  {request.postalCircleName}
                </td>
                <td className="py-2 px-4 border border-border-light dark:border-border-dark">
                  {request.orderName}
                </td>
                <td className="py-2 px-4 border border-border-light dark:border-border-dark">
                  {request.time}
                </td>
                <td className="py-2 px-4 border border-border-light dark:border-border-dark">
                  {request.status}
                </td>
                <td className="py-2 px-4 border border-border-light dark:border-border-dark">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleOpenInput(index)}
                  >
                    <FaPlus />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-4 text-gray-500 dark:text-gray-400"
              >
                No matching help requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg w-1/3 shadow-lg dark:shadow-light shadow-dark">
            <h2 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark">
              Resolve Request
            </h2>
            <textarea
              className="mt-2 w-full p-2 border border-border-dark rounded-md text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-input-light dark:focus:ring-input-dark"
              value={response}
              onChange={handleInputChange}
              placeholder="Write a resolution message..."
            ></textarea>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-accent-light dark:bg-accent-dark text-white px-4 py-2 rounded-md"
                onClick={handleResolve}
              >
                Resolve
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={handleCloseModal}
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

export default MediatorHelpTable;
