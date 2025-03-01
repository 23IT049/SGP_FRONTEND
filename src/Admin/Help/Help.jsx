import { useState, useEffect } from "react";
import SearchInput from "../Postal-Circle/AllPostalCircle/SearchInput";
import HelpTable from "./HelpTable";
import BackButton from "../../UI/BackButton";

const helpRequest = [
  {
    username: "john_doe",
    description: "Unable to track my order.",
    postalCircleName: "New York Circle",
    orderName: "Order #12345",
    time: "10:30 AM",
    status: "Pending",
    reply: "We are looking into this.",
  },
  {
    username: "jane_smith",
    description: "Payment failed during transaction.",
    postalCircleName: "Los Angeles Circle",
    orderName: "Order #98765",
    time: "02:15 PM",
    status: "Resolved",
    reply: "Issue resolved. Payment successful.",
  },
  {
    username: "mark_taylor",
    description: "Wrong item received.",
    postalCircleName: "San Francisco Circle",
    orderName: "Order #54321",
    time: "09:00 AM",
    status: "In Progress",
    reply: "We are processing your request.",
  },
];

const AdminHelp = () => {
  const [helpRequests, setHelpRequests] = useState(helpRequest);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/api/help-requests"); 
  //     const data = await response.json();
  //     setHelpRequests(data);
  //   };

  //   fetchData();
  // }, []);

  // Handle Sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort Logic
  const sortedRequests = [...helpRequests].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key]?.toLowerCase?.() ?? a[sortConfig.key];
    const bValue = b[sortConfig.key]?.toLowerCase?.() ?? b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  // Filter Logic
  const filteredRequests = sortedRequests.filter(
    (request) =>
      request.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.postalCircleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.orderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.reply.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <BackButton />
    <div className="container mx-auto md:p-4 py-5">
      <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark mb-3">
        Help / Support
      </h1>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="px-4">
        <HelpTable data={filteredRequests} handleSort={handleSort} sortConfig={sortConfig} />
      </div>
    </div>
    </div>
  );
};

export default AdminHelp;
