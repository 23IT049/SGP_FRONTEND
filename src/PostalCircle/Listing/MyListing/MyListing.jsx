import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../../../UI/BackButton";
import SearchInput from "../../../Admin/Postal-Circle/AllPostalCircle/SearchInput";
import Table from "./Table";

function MyListing() {
  const [filteredStamps, setFilteredStamps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Fetch items
  const myItems = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/philatelic-items/postalcircle`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFilteredStamps(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    myItems();
  }, []);

  // Sorting logic
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredStamps].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setFilteredStamps(sortedData);
  };

  // Filter based on search query
  const filteredData = filteredStamps.filter((stamp) =>
    Object.values(stamp).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="relative p-4">
      <BackButton />
      <div className="container mx-auto md:py-5">
        <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark md:mb-3 md:mt-0 mt-1 mb-5">
          My Listing
        </h1>
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Table
          filteredData={filteredData}
          sortConfig={sortConfig}
          handleSort={handleSort}
        />
      </div>
    </div>
  );
}

export default MyListing;
