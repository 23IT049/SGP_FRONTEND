import { useState } from "react";

function UserInfo() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobile: "",
    email: "",
  });

  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [showMobileOtp, setShowMobileOtp] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);

  const handleFieldChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMobileVerify = () => {
    setShowMobileOtp(true);
  };

  const handleEmailVerify = () => {
    setShowEmailOtp(true);
  };

  const verifyMobileOtp = () => {
    if (mobileOtp === "1234") {
      setMobileVerified(true);
      setShowMobileOtp(false);
      alert("Mobile number verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const verifyEmailOtp = () => {
    if (emailOtp === "5678") {
      setEmailVerified(true);
      setShowEmailOtp(false);
      alert("Email verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">User Info Form</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={userDetails.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={userDetails.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Street</label>
            <input
              type="text"
              placeholder="Enter your street"
              value={userDetails.street}
              onChange={(e) => handleFieldChange("street", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              value={userDetails.city}
              onChange={(e) => handleFieldChange("city", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              placeholder="Enter your state"
              value={userDetails.state}
              onChange={(e) => handleFieldChange("state", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              placeholder="Enter your country"
              value={userDetails.country}
              onChange={(e) => handleFieldChange("country", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <input
              type="text"
              placeholder="Enter your pincode"
              value={userDetails.pincode}
              onChange={(e) => handleFieldChange("pincode", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter your mobile number"
                value={userDetails.mobile}
                onChange={(e) => handleFieldChange("mobile", e.target.value)}
                className="flex-1 p-2 border rounded"
                disabled={mobileVerified}
              />
              <button
                type="button"
                onClick={handleMobileVerify}
                disabled={mobileVerified}
                className={`p-2 rounded ${
                  mobileVerified ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                }`}
              >
                {mobileVerified ? "Verified" : "Verify"}
              </button>
            </div>
            {showMobileOtp && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={verifyMobileOtp}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={userDetails.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                className="flex-1 p-2 border rounded"
                disabled={emailVerified}
              />
              <button
                type="button"
                onClick={handleEmailVerify}
                disabled={emailVerified}
                className={`p-2 rounded ${
                  emailVerified ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                }`}
              >
                {emailVerified ? "Verified" : "Verify"}
              </button>
            </div>
            {showEmailOtp && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={verifyEmailOtp}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
