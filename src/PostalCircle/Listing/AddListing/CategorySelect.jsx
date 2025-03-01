function CategorySelect({ value, onChange, categories }) {
  return (
    <div>
      <label htmlFor="category" className="block font-semibold text-gray-700 dark:text-gray-200">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
        required
      >
        <option value="" disabled>Select a Category</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelect;
