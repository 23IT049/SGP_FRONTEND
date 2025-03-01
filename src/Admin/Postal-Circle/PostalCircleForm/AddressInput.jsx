const AddressInput = ({ address, onChange }) => (
    <div className="flex flex-col space-y-2">
      <label className="font-medium mb-1 text-background-dark dark:text-text-dark">Address</label>
      <input
        type="text"
        name="address.street"
        value={address.street}
        onChange={onChange}
        placeholder="Street"
        className="p-2 border rounded-md dark:border-input-dark dark:bg-input-dark dark:text-text-dark dark:bg-background-dark"
        required
      />
      <input
        type="text"
        name="address.city"
        value={address.city}
        onChange={onChange}
        placeholder="City"
        className="p-2 border rounded-md dark:border-input-dark dark:bg-input-dark dark:text-text-dark dark:bg-background-dark"
        required
      />
      <input
        type="text"
        name="address.pincode"
        value={address.pincode}
        onChange={onChange}
        placeholder="Pincode"
        className="p-2 border rounded-md dark:border-input-dark dark:bg-input-dark dark:text-text-dark dark:bg-background-dark"
        required
      />
    </div>
  );
  
  export default AddressInput;
  