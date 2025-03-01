import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

// SortIcon component with default props
const SortIcon = ({ sortKey, sortConfig = { key: null, direction: null } }) => {
  if (sortConfig.key !== sortKey) {
    return <FaSort className="inline ml-1" />;
  }

  return sortConfig.direction === "ascending" ? (
    <FaSortUp className="inline ml-1" />
  ) : (
    <FaSortDown className="inline ml-1" />
  );
};

export default SortIcon;
