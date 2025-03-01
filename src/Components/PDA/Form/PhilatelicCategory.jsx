function PhilatelicCategory({ category, items, formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prevData) => {
      const updatedInventory = { ...prevData.philatelicInventory };

      if (checked) {
        // Set the count to 1 when checked
        updatedInventory[name] = 1;
      } else {
        // Remove the item from the inventory when unchecked
        delete updatedInventory[name];
      }

      return {
        ...prevData,
        philatelicInventory: updatedInventory,
      };
    });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark dark:placeholder:text-text-dark">
        {category}
      </h3>
      {items.map((item) => (
        <div key={item} className="flex items-center mb-2">
          <input
            type="checkbox"
            name={item}
            checked={formData.philatelicInventory[item] === 1} // Check if count is exactly 1
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-text-light dark:text-text-dark mr-2">
            {item}
          </label>
        </div>
      ))}
    </div>
  );
}

export default PhilatelicCategory;
