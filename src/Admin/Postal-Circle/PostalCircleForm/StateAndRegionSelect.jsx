import FormSelect from "./FormSelect";

const StateAndRegionSelect = ({ state, region, onStateChange }) => {
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];

  return (
    <>
      <FormSelect
        label="State"
        name="state"
        value={state}
        options={states}
        onChange={onStateChange}
      />
      <div className="flex flex-col">
        <label className="font-medium mb-1 text-background-dark dark:text-text-dark">Region</label>
        <input
          type="text"
          value={region}
          className="p-2 border rounded-md dark:border-input-dark dark:bg-input-dark dark:text-text-dark dark:bg-background-dark"
          disabled
          placeholder="Region"
        />
      </div>
    </>
  );
};

export default StateAndRegionSelect;
