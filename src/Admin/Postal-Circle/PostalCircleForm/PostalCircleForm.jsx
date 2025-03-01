import { useState } from "react";
import BackButton from "../../../UI/BackButton";
import FormInput from "./FormInput";
import AddressInput from "./AddressInput";
import StateAndRegionSelect from "./StateAndRegionSelect";
import axios from "axios";

const PostalCircleForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    region: "",
    state: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
  });

  const stateRegions = {
    "Andhra Pradesh": "Southern",
    "Arunachal Pradesh": "Eastern",
    Assam: "Eastern",
    Bihar: "Eastern",
    Chhattisgarh: "Central",
    Goa: "Western",
    Gujarat: "Western",
    Haryana: "Northern",
    "Himachal Pradesh": "Northern",
    Jharkhand: "Eastern",
    Karnataka: "Southern",
    Kerala: "Southern",
    "Madhya Pradesh": "Central",
    Maharashtra: "Western",
    Manipur: "Eastern",
    Meghalaya: "Eastern",
    Mizoram: "Eastern",
    Nagaland: "Eastern",
    Odisha: "Eastern",
    Punjab: "Northern",
    Rajasthan: "Western",
    Sikkim: "Eastern",
    "Tamil Nadu": "Southern",
    Telangana: "Southern",
    Tripura: "Eastern",
    Uttarakhand: "Northern",
    "Uttar Pradesh": "Northern",
    "West Bengal": "Eastern",
    "Andaman and Nicobar Islands": "Southern",
    Chandigarh: "Northern",
    "Dadra and Nagar Haveli and Daman and Diu": "Western",
    Lakshadweep: "Southern",
    Delhi: "Northern",
    Puducherry: "Southern",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const fieldName = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [fieldName]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const region = stateRegions[selectedState] || "";
    setFormData({
      ...formData,
      state: selectedState,
      region,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Retrieve token just before making the request
      const token = localStorage.getItem("token");
      console.log("inside psot circle form " , token);
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
    
      const response = await axios.post("http://localhost:5000/api/postal-circles", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      console.log("Data:", response.data);
      console.log("Postal Circle Created");
    
      setFormData({
        name: "",
        email: "",
        region: "",
        state: "",
        address: {
          street: "",
          city: "",
          pincode: "",
        },
      });
    } catch (error) {
      console.error("Error creating postal circle:", error);
      alert(error?.response?.data?.message || "An error occurred while creating the postal circle.");
    }    
  };

  return (
    <div className="relative">
      <BackButton />
      <div className="container mx-auto p-4 py-6">
        <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark mb-5">
          Create Postal Circle
        </h1>
        <div className="max-w-2xl mx-auto mb-6 shadow-xl dark:shadow-shadow-dark dark:shadow-5xl rounded-lg p-8 dark:bg-gradient-to-r dark:from-[#272719] dark:to-[#34341c]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Postal Circle Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Postal Circle Name"
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Postal Circle Email"
            />
            <StateAndRegionSelect
              state={formData.state}
              region={formData.region}
              onStateChange={handleStateChange}
            />
            <AddressInput address={formData.address} onChange={handleChange} />
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white px-6 py-2 rounded-md bg-primary-dark hover:opacity-90"
              >
                Create Postal Circle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostalCircleForm;
