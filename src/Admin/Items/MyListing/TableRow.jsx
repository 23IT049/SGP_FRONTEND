const TableRow = ({ stamp }) => {
  return (
    <tr>
      <td className="border border-border-light dark:border-border-dark p-2 text-center">
        <img
          src={stamp.image  || "/placeholder-image.png"}
          alt={stamp.name}
          className="w-16 h-16 object-cover mx-auto"
        />
      </td>
      <td className="border border-border-light dark:border-border-dark p-2 dark:text-text-dark">
        {stamp.name}
      </td>
      <td className="border border-border-light dark:border-border-dark p-2 dark:text-text-dark">
        ₹{stamp.price}
      </td>
      <td className="border border-border-light dark:border-border-dark p-2 dark:text-text-dark">
        {stamp.stock}
      </td>
      <td className="border border-border-light dark:border-border-dark p-2 dark:text-text-dark">
        {stamp.category}
      </td>
      <td className="border border-border-light dark:border-border-dark p-2 dark:text-text-dark">
        {stamp.subitem}
      </td>
      <td className="border border-border-light dark:border-border-dark p-2 text-center">
        <button
          onClick={() => alert(`Edit stamp with ID: ${stamp._id}`)}
          className="text-primary-dark underline"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
