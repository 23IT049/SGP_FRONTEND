function PostalCircleSelect({ postalCircles, value, onChange }) {
  return (
    <div>
      <label
        htmlFor="postalCircleId"
        className="block font-semibold text-gray-700 dark:text-gray-200"
      >
        Postal Circle
      </label>
      <select
        id="postalCircleId"
        name="postalCircleId"
        value={value} 
        onChange={onChange} 
        className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
        required
      >
        <option value="">Select Postal Circle</option>
        {postalCircles.map((circle) => (
          <option key={circle._id} value={circle._id}>
            {circle.name}
          </option>
        ))}
      </select>
    </div>
  );
}


export default PostalCircleSelect;
