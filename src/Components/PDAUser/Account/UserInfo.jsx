import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function UserInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // emailOtp: "",
    // phoneOtp: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [emailOtpVisible, setEmailOtpVisible] = useState(false);
  const [phoneOtpVisible, setPhoneOtpVisible] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {currUser} = useAuth();


  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name";
    if (!formData.email.trim()) newErrors.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.phone.trim())
      newErrors.phone = "Please enter your phone number";

    // Address fields validation
    if (!formData.address.street.trim())
      newErrors.street = "Please enter your street";
    if (!formData.address.city.trim())
      newErrors.city = "Please enter your city";
    if (!formData.address.state.trim())
      newErrors.state = "Please enter your state";
    if (!formData.address.country.trim())
      newErrors.country = "Please enter your country";
    if (!formData.address.pincode.trim())
      newErrors.pincode = "Please enter your pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle change for both top-level and nested fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear any error related to the field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Email OTP Functions
  // const sendEmailOtp = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/api/auth/send-email-otp", {
  //       email: formData.email,
  //     });
  //     message.success("OTP sent to your email!");
  //     setEmailOtpVisible(true);
  //   } catch (error) {
  //     message.error("Failed to send OTP for email.");
  //   }
  // };

  // const verifyEmailOtp = async (emailOtp) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/auth/verify-email-otp",
  //       {
  //         email: formData.email,
  //         otp: emailOtp,
  //       }
  //     );
  //     if (response.data.message) {
  //       setEmailOtpVerified(true);
  //       message.success("Email verified successfully!");
  //       setEmailOtpVisible(false);
  //     } else {
  //       message.error("Invalid email OTP.");
  //     }
  //   } catch (error) {
  //     message.error("Error verifying email OTP.");
  //   }
  // };

  // // Phone OTP Functions
  // const sendPhoneOtp = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/api/auth/send-otp", {
  //       phoneNumber: formData.phone,
  //     });
  //     message.success("OTP sent to your phone!");
  //     setPhoneOtpVisible(true);
  //   } catch (error) {
  //     message.error("Failed to send OTP for phone.");
  //   }
  // };

  // const verifyPhoneOtp = async (phoneOtp) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/auth/verify-otp",
  //       {
  //         phoneNumber: formData.phone,
  //         otp: phoneOtp,
  //       }
  //     );
  //     if (response.data.message) {
  //       setPhoneOtpVerified(true);
  //       message.success("Phone verified successfully!");
  //       setPhoneOtpVisible(false);
  //     } else {
  //       message.error("Invalid phone OTP.");
  //     }
  //   } catch (error) {
  //     message.error("Error verifying phone OTP.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
        navigate("/pda-user/create-account"); 

    // Validate form data before submission
    if (!validateForm()) return;

    // Check if OTPs are verified
    if (!emailOtpVerified) {
      message.warning("Please verify your email OTP.");
      return;
    }
    if (!phoneOtpVerified) {
      message.warning("Please verify your phone OTP.");
      return;
    }

    const updatedFormData = { ...formData };

    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/profile/update",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        message.success("User information saved successfully!");
        // navigate("/pda-user/create-account/add-money"); 
      } else {
        message.error("Failed to save user information.");
      }
    } catch (error) {
      message.error("An error occurred while saving user information.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-min-screen my-3">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={currUser.name}
              // onChange={handleChange}
              placeholder="Enter name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                value={currUser.email}
                // onChange={handleChange}
                placeholder="Enter your email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled
              />
              {/* <button
                type="button"
                onClick={sendEmailOtp}
                className="bg-[#8D8D0C] text-white px-3 py-2 rounded-md"
              >
                Verify
              </button> */}
            </div>
            {/* {emailOtpVisible && (
              <div>
                <input
                  type="text"
                  name="emailOtp"
                  value={formData.emailOtp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="mt-2 block w-full px-3 py-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => verifyEmailOtp(formData.emailOtp)}
                  className="mt-2 bg-green-500 text-white px-3 py-2 rounded-md"
                >
                  Verify Email OTP
                </button>
              </div>
            )} */}
            {/* {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )} */}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="phone"
                value={currUser.phone}
                // onChange={handleChange}
                placeholder="Enter your phone"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled
              />
              {/* <button
                type="button"
                onClick={sendPhoneOtp}
                className="bg-[#8D8D0C] text-white px-3 py-2 rounded-md"
              >
                Verify
              </button> */}
            </div>
            {/* {phoneOtpVisible && (
              <div>
                <input
                  type="text"
                  name="phoneOtp"
                  value={currUser.phone}
                  // onChange={handleChange}
                  placeholder="Enter OTP"
                  className="mt-2 block w-full px-3 py-2 border rounded-md"
                  disabled
                /> */}
                {/* <button
                  type="button"
                  onClick={() => verifyPhoneOtp(formData.phoneOtp)}
                  className="mt-2 bg-green-500 text-white px-3 py-2 rounded-md"
                >
                  Verify Phone OTP
                </button> */}
              {/* </div> */}
            {/* )} */}
            {/* {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )} */}
          </div>

          {/* Address Fields */}
          {["street", "city", "state", "country", "pincode"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData.address[field]} // Access nested fields
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {errors[field] && (
                <p className="text-red-500 text-xs">{errors[field]}</p>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#8D8D0C] text-white py-2 px-4 rounded-md hover:opacity-90"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
