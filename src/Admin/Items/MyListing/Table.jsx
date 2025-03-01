import SortIcon from "../../../Admin/Postal-Circle/AllPostalCircle/SortIcon";
import TableRow from "./TableRow";

const Table = ({ filteredData, sortConfig, handleSort }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-border-dark">
        <thead>
          <tr className="bg-accent-light">
            <th
              className="border border-border-light text-white dark:border-border-dark p-2 cursor-pointer"
              onClick={() => handleSort("imageUrl")}
            >
              Image <SortIcon sortKey="imageUrl" sortConfig={sortConfig} />
            </th>
            <th
              className="border border-border-light text-white dark:border-border-dark p-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name <SortIcon sortKey="name" sortConfig={sortConfig} />
            </th>
            <th
              className="border border-border-light text-white dark:border-border-dark p-2 cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price <SortIcon sortKey="price" sortConfig={sortConfig} />
            </th>
            <th
              className="border border-border-light text-white dark:border-border-dark p-2 cursor-pointer"
              onClick={() => handleSort("stock")}
            >
              Stock <SortIcon sortKey="stock" sortConfig={sortConfig} />
            </th>
            <th
              className="border border-border-light text-white dark:border-border-dark p-2 cursor-pointer"
              onClick={() => handleSort("category")}
            >
              Category <SortIcon sortKey="category" sortConfig={sortConfig} />
            </th>
            <th
              className="border border-border-light text-white dark:border-border-dark p-2 cursor-pointer"
              onClick={() => handleSort("subcategory")}
            >
              Subcategory{" "}
              <SortIcon sortKey="subcategory" sortConfig={sortConfig} />
            </th>
            <th className="border border-border-light text-white dark:border-border-dark p-2">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((stamp) => <TableRow key={stamp._id} stamp={stamp} />)
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center text-lg dark:text-text-dark p-4"
              >
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
