const itemTypes = ["stamps", "souvenir sheets", "first day covers"];

function ItemTypesSelection({ formData, setFormData }) {
  const handleItemTypesChange = (type) => {
    const isSelected = formData.preferences.item_types.includes(type);
    setFormData((prevData) => ({
      ...prevData,
      preferences: {
        ...prevData.preferences,
        item_types: isSelected
          ? prevData.preferences.item_types.filter((t) => t !== type)
          : [...prevData.preferences.item_types, type],
      },
    }));
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
        Item Types
      </h3>
      {itemTypes.map((type) => (
        <label key={type} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={formData.preferences.item_types.includes(type)}
            onChange={() => handleItemTypesChange(type)}
            className="mr-2"
          />
          {type}
        </label>
      ))}
    </div>
  );
}

export default ItemTypesSelection;
