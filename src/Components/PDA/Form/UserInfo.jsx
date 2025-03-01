import axios from "axios";
import { useEffect, useState } from "react";

function UserInfo({ formData, setFormData }) {
  const [postalCircles, setPostalCircles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/postal-circles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPostalCircles(res.data);
      })
      .catch((error) => {
        console.error("Error fetching postal circles:", error);
      });
  }, []);
  return (
    <>
      <div className="mb-4">
        <label className="block text-text-light dark:text-text-dark mb-2">
          Postal Circle
        </label>
        <select
          id="postalCircle"
          name="postalCircle"
          value={formData.postal_circle._id || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              postal_circle: { _id: e.target.value },
            })
          }
          // required
          className="w-full p-2 border rounded-md dark:bg-background-dark dark:border-input-dark-border dark:text-white"
        >
          <option value="">Select Postal Circle</option>
          {postalCircles.map((circle) => (
            <option key={circle._id} value={circle._id}>
              {circle.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default UserInfo;
