import PostalCircleTableHeader from "./PostalCircleTableHeader";
import PostalCircleTableRow from "./PostalCircleTableRow";

const PostalCircleTable = ({ circles, handleSort, sortConfig }) => {
  return (
    <div className="overflow-x-auto max-w-lg md:max-w-screen-2xl mx-auto md:p-4">
      <table className="w-full text-left border-collapse dark:bg-background-dark rounded-lg overflow-hidden">
        <PostalCircleTableHeader handleSort={handleSort} sortConfig={sortConfig} />
        <tbody>
          {circles.length > 0 ? (
            circles.map((circle) => (
              <PostalCircleTableRow key={circle.unique_id} circle={circle} />
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="md:p-3 text-center text-gray-500 dark:text-gray-400"
              >
                No postal circles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostalCircleTable;
