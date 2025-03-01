import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const UpdateProfile = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
      country: user?.address?.country || "",
    },
  });

  const {currUser} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "pincode", "country"].includes(name)) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = jwtDecode(token).id;
    formData["id"] = id;
    console.log(formData);
    axios
      .put(`http://localhost:5000/api/user/profile/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((res) => {
        console.log("updated..", res.data);
        
        onUpdate(formData);
      })
      .catch((err) => console.log(err));
    if (onUpdate) onUpdate(formData);
  };

  const handleClose = () => {
    if (onUpdate) onUpdate(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-lg w-full bg-white dark:bg-background-dark rounded-lg shadow-lg p-6 dark:shadow-dark">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border rounded transition dark:text-accent-dark"
          style={{
            border: "none",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-center text-primary-dark dark:text-primary-light">
            Update Profile
          </h2>

          <div>
            <label className="block font-medium text-primary-dark dark:text-primary-light">
              Display Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="displayName"
              value={currUser.user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
              disabled
            />
          </div>

          <div>
            <label className="block font-medium text-primary-dark dark:text-primary-light">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={currUser.user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
              disabled
            />
          </div>

          <div>
            <label className="block font-medium text-primary-dark dark:text-primary-light">
              Mobile No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mobile"
              value={currUser.user.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
              disabled
            />
          </div>

          <h3 className="text-lg font-semibold text-primary-dark dark:text-primary-light">
            Address
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-primary-dark dark:text-primary-light">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primarylight"
              />
            </div>
            <div>
              <label className="block font-medium text-primary-dark dark:text-primary-light">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
              />
            </div>
            <div>
              <label className="block font-medium text-primary-dark dark:text-primary-light">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
              />
            </div>
            <div>
              <label className="block font-medium text-primary-dark dark:text-primary-light">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
              />
            </div>
            <div>
              <label className="block font-medium text-primary-dark dark:text-primary-light">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100 dark:text-primary-light dark:hover:bg-background-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: "#808000" }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
