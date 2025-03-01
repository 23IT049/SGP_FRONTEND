function PostalStationeryInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="postalStationeryValue" className="block font-semibold text-gray-700 dark:text-gray-200">
        Postal Stationery Quantity
      </label>
      <input
        type="number"
        id="postalStationeryValue"
        name="postalStationeryValue"
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
        min="1"
        required
      />
    </div>
  );
}

export default PostalStationeryInput;
