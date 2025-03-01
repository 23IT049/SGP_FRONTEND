import { useState } from "react";
import MediatorHelpTable from "./MediatorHelpTable"; // Adjust the import path as necessary
import SearchInput from "../../Admin/Postal-Circle/AllPostalCircle/SearchInput"; // Assuming this is the search input component

const MediatorHelpPage = () => {
  // Sample data for help requests
  const [helpRequests, setHelpRequests] = useState([
    {
      username: "john_doe",
      description: "Unable to track my order.",
      postalCircleName: "New York Circle",
      orderName: "Order #12345",
      time: "10:30 AM",
      status: "Pending",
    },
    {
      username: "jane_smith",
      description: "Payment failed during transaction.",
      postalCircleName: "Los Angeles Circle",
      orderName: "Order #98765",
      time: "02:15 PM",
      status: "Resolved",
    },
    {
      username: "mark_taylor",
      description: "Wrong item received.",
      postalCircleName: "San Francisco Circle",
      orderName: "Order #54321",
      time: "09:00 AM",
      status: "In Progress",
    },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");

  // Sorting function
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort the filtered data
  const sortedRequests = [...helpRequests].sort((a, b) => {
    if (!sortConfig.key) return 0;

    // Get values for sorting and handle undefined/null gracefully
    const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
    const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

    // Compare values based on direction
    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  // Filter data based on search query
  const filteredRequests = sortedRequests.filter((request) => {
    const query = searchQuery.toLowerCase();

    // Check all fields in the object for the query
    return Object.values(request).some((value) =>
      value?.toString().toLowerCase().includes(query)
    );
  });

  console.log("helpRequests:", helpRequests);
  console.log("searchQuery:", searchQuery);
  console.log("Filtered Requests:", filteredRequests);

  return (
    <div className="container mx-auto p-4">
      <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark md:mb-3 md:mt-0 mt-12 mb-5">
        Mediator Help Dashboard
      </h1>

      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search across all fields..."
      />

      <MediatorHelpTable
        data={filteredRequests}
        handleSort={handleSort}
        sortConfig={sortConfig}
        setHelpRequests={setHelpRequests}
      />
    </div>
  );
};

export default MediatorHelpPage;
