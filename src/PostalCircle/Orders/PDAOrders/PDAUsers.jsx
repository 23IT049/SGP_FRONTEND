import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BackButton from "../../../UI/BackButton";
import { useAuth } from "../../../context/AuthContext";

const PDAUsers = () => {
  const location = useLocation();
  const { selectedSubcategories } = location.state || {}; // Use only selectedSubcategories
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currUser } = useAuth();

  const token = localStorage.getItem("token");
  const postalCircleId = currUser?._id; console.log(postalCircleId)
  console.log(selectedSubcategories)

  useEffect(() => {
    const fetchUsers = async () => {
      if (!postalCircleId) {
        setError("Postal Circle ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5000/api/pdaOrders/postal-circle/${postalCircleId}/filter-users`,
          {
            selectedCategories: selectedSubcategories, 
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Filtered Users:", response.data); // Log the response for debugging
        setFilteredUsers(response.data.users || []); // Use `response.data.users` safely
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [postalCircleId, selectedSubcategories, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 relative">
      <BackButton />
      <h1 className="text-3xl font-bold text-center text-primary-dark dark:text-text-dark mb-5">
        Users Matching Selected Subcategories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.userId} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-medium">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400">Address: {user.address}</p>
              <p className="text-sm text-gray-400">
                Inventory:{" "}
                {Object.entries(user.philatelicInventory)
                  .map(([subcategory, count]) => `${subcategory} (${count})`)
                  .join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg text-gray-500">
            No users found with the selected subcategories.
          </p>
        )}
      </div>
    </div>
  );
};

export default PDAUsers;
