import { useState } from "react";
import { FaChartBar, FaFileAlt, FaTasks, FaRegCalendarAlt } from "react-icons/fa";

const PostalCircleDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleGenerateReport = () => {
    if (!selectedMonth) {
      alert("Please select a month to generate the report.");
      return;
    }
    alert(`Report for ${selectedMonth} is being generated...`);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="container mx-auto p-6 dark:from-primary-dark dark:to-background-dark rounded-lg shadow-xl">

      {/* Report Generation Section */}
      <div className="mt-8 bg-white dark:bg-background-dark rounded-md shadow-lg p-6 transform transition-transform duration-300">
        <h2 className="text-2xl font-semibold text-primary-dark dark:text-white mb-4 flex items-center">
          <FaRegCalendarAlt className="mr-2" />
          Generate Monthly Reports
        </h2>
        <div className="flex items-center space-x-4">
          <select
            className="w-full md:w-1/2 p-2 border border-gray-300 dark:border-border-dark rounded-md bg-background-light dark:bg-background-dark text-text-light dark:text-white"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select a month</option>
            {months.map((month, idx) => (
              <option key={idx} value={month}>
                {month}
              </option>
            ))}
          </select>
          <button
            className="px-6 py-2 bg-primary-dark text-white rounded-md hover:opacity-90 transition-all"
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Activity Log */}
      {/* <div className="mt-8 bg-white dark:bg-background-dark rounded-md shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-primary-dark dark:text-white mb-4">
          Recent Activities
        </h2>
        <ul className="space-y-4">
          {[
            "Updated bank details for Central Postal Circle.",
            "Generated report for October 2024.",
            "Added a new post office in Northern Region.",
          ].map((activity, idx) => (
            <li
              key={idx}
              className="p-4 bg-gray-100 dark:bg-background-dark rounded-md shadow-sm text-text-light dark:text-white"
            >
              {activity}
            </li>
          ))}
        </ul>
      </div> */}

      {/* Upcoming Tasks */}
      {/* <div className="mt-8 bg-white dark:bg-background-dark rounded-md shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-primary-dark dark:text-white mb-4">
          Upcoming Tasks
        </h2>
        <ul className="space-y-4">
          {[
            "Organize the regional manager meeting on 15th Dec.",
            "Verify post office transactions for the last quarter.",
            "Submit budget report for the upcoming fiscal year.",
          ].map((task, idx) => (
            <li
              key={idx}
              className="p-4 bg-gray-100 dark:bg-background-dark rounded-md shadow-sm text-text-light dark:text-white"
            >
              {task}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default PostalCircleDashboard;
