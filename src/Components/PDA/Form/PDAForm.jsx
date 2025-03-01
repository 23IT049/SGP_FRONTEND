import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationPreferences from "./NotificationPreferences";
import PhilatelicInventory from "./PhilatelicInventory";
import BackButton from "../../../UI/BackButton";
import { useAuth } from "../../../context/AuthContext";
import { showErrorNotification } from "../../../UI/Notification";
import axios from "axios";
import { toast } from "react-hot-toast";


function PDAForm() {
  const navigate = useNavigate();
  const { currUser } = useAuth();
  console.log(currUser);

  const [formData, setFormData] = useState({
    user: { _id: currUser._id },
    email: currUser.email,
    preferences: {
      item_types: [],
      notification_preferences: {
        email: false,
        sms: false,
      },
    },
    status: "active",
    philatelicInventory: {},
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmitAndNavigate = async (e) => {
    e.preventDefault();

    const hasValidNotificationPreferences =
      formData.preferences.notification_preferences.email ||
      formData.preferences.notification_preferences.sms;
    if (!hasValidNotificationPreferences) {
      toast.error("Please fill at least one preference ");
      return;
    }

    const allPhilatelicItems = {
      MintCommemorativeStamps: 0,
      MintDefinitiveStamps: 0,
      TopMarginalBlock: 0,
      BottomMarginalBlock: 0,
      FullSheet: 0,
      FirstDayCoversAffixed: 0,
      FirstDayCoversBlank: 0,
      InformationBrochureAffixed: 0,
      InformationBrochureBlank: 0,
      AnnualStampPack: 0,
      ChildrenSpecialAnnualStampPack: 0,
      SpecialCollectorsStampPack: 0,
      FirstDayCoverPack: 0,
      MiniSheetSouvenirSheet: 0,
    };

    const normalizedInventory = {
      ...allPhilatelicItems,
      ...formData.philatelicInventory,
    };

    const hasValidInventory = Object.values(normalizedInventory).some(
      (count) => parseInt(count) > 0
    );

    if (!hasValidInventory) {
      toast.error('Please select at least one philatelic item with a count greater than 0.')
      return;
    }

    const finalFormData = {
      ...formData,
      philatelicInventory: normalizedInventory,
      preferences: {
        ...formData.preferences,
        item_types: Object.keys(formData.philatelicInventory).filter(
          (item) => formData.philatelicInventory[item] > 0
        ),
      },
    };

    console.log("Final form data", finalFormData);

    try {
      await pdaCreate(finalFormData);
      navigate("/pda/create-account/add-money");
    } catch (e) {
      console.error(e);
      navigate("/pda/create-account");
    }
  };

  const pdaCreate = async (formData) => {
    try {
      console.log("Form data being sent:", formData);

      const response = await axios.post(
        "http://localhost:5000/api/pda",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 201) {
        console.log("PDA account created successfully", response.data);
        toast.success("PDA account created successfully");
        return response.data;
      } else {
        toast.error("Failed to create PDA account. Please try again");
        return null;
      }
    } catch (error) {
      console.error(
        "Error creating PDA account:",
        error.response || error.message
      );
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while creating the account. Please try again.";
      showErrorNotification(errorMessage);
      return null;
    }
  };

  return (
    <div className="relative">
      <BackButton />
      <div className="container mx-auto p-6 my-4 bg-background-light dark:bg-background-dark shadow-md rounded-lg max-w-4xl dark:shadow-shadow-dark">
        <h2 className="md:text-3xl text-xl font-bold text-primary-dark dark:text-white text-center mb-5">
          Select your Preferences
        </h2>
        <form onSubmit={handleSubmitAndNavigate}>
          <NotificationPreferences
            formData={formData}
            setFormData={setFormData}
          />

          <PhilatelicInventory formData={formData} setFormData={setFormData} />
          <button
            type="submit"
            className="px-5 py-2 bg-primary-dark text-white rounded-md hover:opacity-90"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default PDAForm;
