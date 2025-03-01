import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import UserInfo from "../Form/UserInfo";
import NotificationPreferences from "../Form/NotificationPreferences";
import PhilatelicInventory from "../Form/PhilatelicInventory";
import axios from "axios"; // Import axios for making API calls

function UpdatePDAForm({ account, onCancel }) {
  const { currUser } = useAuth();

  // Initialize formData with account details, including item counts for selected items
  const [formData, setFormData] = useState({
    user: { _id: currUser._id },
    email: currUser.email,
    postal_circle: { _id: account?.postal_circle?._id || "" },
    preferences: {
      item_types: account?.preferences?.item_types || [],
      notification_preferences: account?.preferences?.notification_preferences || {
        email: false,
        sms: false,
      },
    },
    status: account?.status || "active",
    philatelicInventory: Object.fromEntries(
      Object.entries(account?.philatelicInventory || {}).filter(
        ([itemId, count]) => count > 0 // Only include items with count > 0
      )
    ),
  });

  // Handler to update item counts
  const handleItemChange = (itemId, count) => {
    setFormData((prevData) => ({
      ...prevData,
      philatelicInventory: {
        ...prevData.philatelicInventory,
        [itemId]: count, // Update the count for the specific item
      },
    }));
  };

  // Handle the form submission and update PDA account
  const handleSubmitAndNavigate = async (e) => {
    e.preventDefault();

    // Ensure that all items (even unselected ones) are included with count 0
    const updatedInventory = { ...formData.philatelicInventory };

    // Loop through all items and set count to 0 for unselected items
    Object.keys(account.philatelicInventory || {}).forEach((itemId) => {
      if (!(itemId in updatedInventory)) {
        updatedInventory[itemId] = 0; // Set count to 0 for unselected items
      }
    });

    // Prepare the data to send in the PUT request
    const updatedData = {
      ...formData,
      philatelicInventory: updatedInventory, // Include all items with their counts
    };

    try {
      // Make the PUT request to update the PDA account
      const response = await axios.put(
        `http://localhost:5000/api/pda/${account._id}`,
        updatedData
      );
      console.log("PDA Account updated successfully:", response.data);
      onCancel(); // Close the form after successful submission
    } catch (error) {
      console.error("Error updating PDA account:", error);
    }
  };

  return (
    <div className="relative">
      <div className="container mx-auto p-6 my-4 bg-background-light dark:bg-background-dark shadow-md rounded-lg max-w-4xl dark:shadow-shadow-dark">
        <h2 className="md:text-3xl text-xl font-bold text-primary-dark dark:text-white text-center mb-5">
          Update PDA Account
        </h2>
        <form onSubmit={handleSubmitAndNavigate}>
          <UserInfo formData={formData} setFormData={setFormData} />
          <NotificationPreferences
            formData={formData}
            setFormData={setFormData}
          />
          <PhilatelicInventory
            formData={formData}
            setFormData={setFormData}
            onItemChange={handleItemChange} // Pass handler for item changes
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="px-5 py-2 bg-gray-500 text-white rounded-md hover:opacity-90"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary-dark text-white rounded-md hover:opacity-90"
            >
              Update Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePDAForm;
