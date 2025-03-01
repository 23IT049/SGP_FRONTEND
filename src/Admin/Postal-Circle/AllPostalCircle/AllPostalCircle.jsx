import { useState } from "react";
import { usePostalCircle } from "../../../context/PostalCircleContext";
import BackButton from "../../../UI/BackButton";
import SearchInput from "./SearchInput";
import PostalCircleTable from "./PostalCircleTable";

const AllPostalCircle = () => {
  const { postalCircles } = usePostalCircle();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const filteredCircles = postalCircles.filter((circle) =>
    Object.values(circle).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedCircles = [...filteredCircles].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    return sortConfig.direction === "ascending"
      ? valueA > valueB
        ? 1
        : -1
      : valueA < valueB
      ? 1
      : -1;
  });
  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction:
          sortConfig.direction === "ascending" ? "descending" : "ascending",
      });
    } else {
      setSortConfig({ key, direction: "ascending" });
    }
  };

  return (
    <div className="relative">
      <BackButton />
      <div className="container mx-auto md:p-4 py-5">
        <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark mb-3">
          All Postal Circles
        </h1>

        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <PostalCircleTable
          circles={sortedCircles}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />
      </div>
    </div>
  );
};

export default AllPostalCircle;
