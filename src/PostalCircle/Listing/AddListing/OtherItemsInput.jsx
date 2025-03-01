function OtherItemsInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="otherItemsValue" className="block font-semibold text-gray-700 dark:text-gray-200">
        Other Item Name
      </label>
      <input
        type="text"
        id="otherItemsValue"
        name="otherItemsValue"
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
        required
      />
    </div>
  );
}

export default OtherItemsInput;
