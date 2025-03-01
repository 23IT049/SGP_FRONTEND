import { FiSearch } from "react-icons/fi";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4">
      <div className="relative w-full md:w-1/2 mx-auto">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 pr-12 border-2 dark:bg-background-dark border-primary-dark rounded-md w-full text-black dark:text-text-dark"
        />
        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchInput;
