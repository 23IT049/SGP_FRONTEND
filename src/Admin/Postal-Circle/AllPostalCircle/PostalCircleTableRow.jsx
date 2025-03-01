import { useNavigate } from "react-router-dom";

const PostalCircleTableRow = ({ circle }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/admin/all-postal-circles/details/${circle.unique_id}`);
  };

  return (
    <tr
      onClick={handleRowClick}
      className="border-b dark:border-gray-700 cursor-pointer hover:bg-[#9E9E1C]"
    >
      <td className="p-3 dark:text-text-dark">{circle.name}</td>
      <td className="p-3 dark:text-text-dark">₹{circle.total_revenue}</td>
      <td className="p-3 dark:text-text-dark">{circle.state}</td>
      <td className="p-3 dark:text-text-dark">{circle.address.city}</td>
    </tr>
  );
};

export default PostalCircleTableRow;
