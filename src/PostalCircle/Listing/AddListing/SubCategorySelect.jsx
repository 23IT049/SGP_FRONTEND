function SubCategorySelect({ availableSubcategories, value, onChange }) {
  if (availableSubcategories.length === 0) return null;

  return (
    <div>
      <label htmlFor="subCategory" className="block font-semibold text-gray-700 dark:text-gray-200">
        Subcategory
      </label>
      <select
        id="subCategory"
        name="subitem"
        value={value} // Bind to formData.subCategory
        onChange={onChange} // Call onChange to update subCategory
        className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
        required
      >
        <option value="" disabled>Select a Subcategory</option>
        {availableSubcategories.map((subCategory) => (
          <option key={subCategory} value={subCategory}>{subCategory}</option>
        ))}
      </select>
    </div>
  );
}

export default SubCategorySelect;
