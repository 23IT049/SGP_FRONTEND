const NewAddressForm = ({ newAddress, handleInputChange, isNewAddressComplete, handleNewAddressSelection }) => {
  return (
    <div className="w-full md:w-1/2 dark:text-white">
      <h3 className="text-lg font-semibold mb-4 text-primary-dark">Add New Address</h3>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={newAddress.street}
          onChange={handleInputChange}
          className="p-2 border rounded border-border-dark dark:bg-background-dark"
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={newAddress.city}
          onChange={handleInputChange}
          className="p-2 border rounded border-border-dark dark:bg-background-dark"
        />
        <input
          type="text"
          placeholder="State"
          name="state"
          value={newAddress.state}
          onChange={handleInputChange}
          className="p-2 border rounded border-border-dark dark:bg-background-dark"
        />
          <input
          type="text"
          placeholder="Country"
          name="country"
          value={newAddress.country}
          onChange={handleInputChange}
          className="p-2 border rounded border-border-dark dark:bg-background-dark"
        />
        <input
          type="text"
          placeholder="Pincode"
          name="pincode"
          value={newAddress.pincode}
          onChange={handleInputChange}
          className="p-2 border rounded border-border-dark dark:bg-background-dark"
        />
        <input
          type="text"
          placeholder="Mobile"
          name="phone"
          value={newAddress.phone}
          onChange={handleInputChange}
          className="p-2 border rounded border-border-dark dark:bg-background-dark"
        />
      </div>
      {isNewAddressComplete() && (
        <button
          className="mt-4 bg-accent-light text-white py-2 px-4 rounded"
          onClick={handleNewAddressSelection}
        >
          Use This Address
        </button>
      )}
    </div>
  );
};

export default NewAddressForm;
