import SortIcon from "./SortIcon";

const PostalCircleTableHeader = ({ handleSort, sortConfig }) => {
  const headers = [
    { key: "name", label: "Name" },
    { key: "revenue", label: "Revenue" },
    { key: "state", label: "State" },
    { key: "city", label: "City" },
  ];

  return (
    <thead>
      <tr className="bg-primary-dark text-white">
        {headers.map((header) => (
          <th
            key={header.key}
            className="p-3 cursor-pointer"
            onClick={() => handleSort(header.key)}
          >
            {header.label} <SortIcon sortKey={header.key} sortConfig={sortConfig} />
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default PostalCircleTableHeader;
