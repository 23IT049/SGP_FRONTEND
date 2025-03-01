import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast"; 

const circle = [{
  name: "Central Postal Circle",
  region: "Northern Region",
  manager: "John Doe",
  contactEmail: "manager@centralcircle.com",
  contactNumber: "123-456-7890",
  address: "123 Main Street, Capital City, Country",
  establishedDate: "01 January 1990",
  bankDetails: {
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
  },
}]

const PostalCircleProfile = () => {
  const [postalCircleData, setPostalCircleData] = useState(circle[0]);

  


  const [editingBankDetails, setEditingBankDetails] = useState(false);
  const [bankDetails, setBankDetails] = useState(postalCircleData.bankDetails);

  const handleBankDetailChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const saveBankDetails = () => {
    setPostalCircleData((prev) => ({
      ...prev,
      bankDetails,
    }));
    setEditingBankDetails(false);
    toast.success("Bank details saved successfully!"); 
  };

  return (
    <div className="container mx-auto p-6 dark:to-background-dark rounded-lg shadow-xl">
      <div className="p-6 bg-white dark:bg-background-dark rounded-md shadow-md dark:shadow-sm dark:shadow-white flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary-dark dark:text-accent-dark">
            Postal Circle Profile
          </h1>
          <p className="text-lg text-text-light dark:text-white">
            Manage your postal circle's information and bank details.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 dark:text-white">
       
        <div className="p-6 bg-white dark:bg-background-dark rounded-md shadow-lg dark:shadow-sm dark:shadow-white transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-primary-dark mb-4 flex items-center">
            General Information
          </h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {postalCircleData.name}
            </p>
            <p>
              <span className="font-medium">Region:</span> {postalCircleData.region}
            </p>
            <p>
              <span className="font-medium">Manager:</span> {postalCircleData.manager}
            </p>
            <p>
              <span className="font-medium">Contact Email:</span>{" "}
              <a
                href={`mailto:${postalCircleData.contactEmail}`}
                className="underline hover:text-accent-light transition-colors"
              >
                {postalCircleData.contactEmail}
              </a>
            </p>
            <p>
              <span className="font-medium">Contact Number:</span>{" "}
              {postalCircleData.contactNumber}
            </p>
            <p>
              <span className="font-medium">Address:</span> {postalCircleData.address}
            </p>
            <p>
              <span className="font-medium">Established:</span>{" "}
              {postalCircleData.establishedDate}
            </p>
          </div>
        </div>

       
        <div className="p-6 bg-white dark:bg-background-dark rounded-md shadow-lg dark:shadow-sm dark:shadow-white transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-primary-dark mb-4 flex items-center">
            Bank Details
          </h2>
          {!editingBankDetails ? (
            <div className="space-y-2">
              {postalCircleData.bankDetails.accountNumber ? (
                <>
                  <p>
                    <span className="font-medium">Account Name:</span>{" "}
                    {postalCircleData.bankDetails.accountName}
                  </p>
                  <p>
                    <span className="font-medium">Account Number:</span>{" "}
                    {postalCircleData.bankDetails.accountNumber}
                  </p>
                  <p>
                    <span className="font-medium">Bank Name:</span>{" "}
                    {postalCircleData.bankDetails.bankName}
                  </p>
                  <p>
                    <span className="font-medium">IFSC Code:</span>{" "}
                    {postalCircleData.bankDetails.ifscCode}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No bank details added yet.</p>
              )}
              <button
                className="mt-4 flex items-center bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-accent-dark transition-all"
                onClick={() => setEditingBankDetails(true)}
              >
                <FaEdit className="mr-2" />
                {postalCircleData.bankDetails.accountNumber
                  ? "Edit Bank Details"
                  : "Add Bank Details"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {["Account Name", "Account Number", "Bank Name", "IFSC Code"].map((label, index) => {
                const name = label.toLowerCase().replace(" ", "");
                return (
                  <div key={index}>
                    <label className="block font-semibold mb-1">{label}</label>
                    <input
                      type="text"
                      name={name}
                      value={bankDetails[name]}
                      onChange={handleBankDetailChange}
                      className="w-full border border-gray-200 dark:border-border-dark rounded-md px-3 py-2 dark:bg-background-dark"
                    />
                  </div>
                );
              })}
              <div className="flex items-center space-x-4">
                <button
                  className="mt-4 flex items-center bg-primary-dark text-white px-6 py-2 rounded-md hover:bg-accent-dark transition-all"
                  onClick={saveBankDetails}
                >
                  <FaSave className="mr-2" /> Save Details
                </button>
                <button
                  className="mt-4 flex items-center bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-all"
                  onClick={() => setEditingBankDetails(false)}
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostalCircleProfile;
