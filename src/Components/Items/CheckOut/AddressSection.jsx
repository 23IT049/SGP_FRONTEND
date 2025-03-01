import NewAddressForm from "./NewAddressForm";

const AddressSection = ({
  activeSection,
  openSection,
  selectedAddress,
  setSelectedAddress,
  newAddress,
  handleInputChange,
  isNewAddressComplete,
  handleNewAddressSelection,
  address,
  phone,
}) => {
  console.log(address)
  return (
    <div className="mb-4">
      <h2
        className="text-xl font-semibold mb-2 cursor-pointer text-accent-light dark:text-accent-dark"
        onClick={() => openSection("address")}
      >
        1. Delivery Address
      </h2>

      {selectedAddress && (
        <div className="border p-4 rounded mb-4 bg-gray-100 dark:bg-background-dark dark:text-white">
          <h3 className="text-lg font-semibold mb-2 text-primary-dark dark:text-accent-dark">Delivery Address</h3>
          <p>{selectedAddress.name}</p>
          <p>
            {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.pincode}
          </p>
          <p>Mobile: {phone}</p>
        </div>
      )}

      {activeSection === "address" && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 dark:text-white">
            <h3 className="text-lg font-semibold mb-4 text-primary-dark">Select Existing Address</h3>
              <div
                key={address.id}
                onClick={() => setSelectedAddress(address)}
                className={`cursor-pointer border p-4 rounded mb-2 ${
                  selectedAddress?.id === address.id ? "border-blue-500 bg-blue-100 dark:border-border-dark dark:bg-primary-dark" : "border-border-dark"
                }`}
              >
                <p>{address.name}</p>
                <p>
                  {address.street}, {address.city}, {address.state} &nbsp;{address.pincode}
                </p>
                <p>Mobile No. {phone}</p>
              </div>
          </div>

          <NewAddressForm
            newAddress={newAddress}
            handleInputChange={handleInputChange}
            isNewAddressComplete={isNewAddressComplete}
            handleNewAddressSelection={handleNewAddressSelection}
          />
        </div>
      )}


    </div>
  );
};

export default AddressSection;
