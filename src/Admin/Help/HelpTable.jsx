import SortIcon from "../Postal-Circle/AllPostalCircle/SortIcon";

const HelpTable = ({ data, handleSort, sortConfig }) => {
  return (
    <table className="w-full border-collapse border border-border-light dark:text-text-dark dark:border-border-dark shadow-lg rounded-lg overflow-hidden">
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
            Description <SortIcon sortKey="description" sortConfig={sortConfig} />
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
            Order Name <SortIcon sortKey="orderName" sortConfig={sortConfig} />
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
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="6"
              className="text-center py-4 text-gray-500 dark:text-gray-400"
            >
              No matching help requests found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default HelpTable;
