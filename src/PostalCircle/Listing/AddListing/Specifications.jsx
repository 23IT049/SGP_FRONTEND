function Specifications({ specifications, onChange }) {
  const handleInputChange = (e, key) => {
    onChange(e, key);
  };

  return (
    <div>
      <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
        Specifications
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(specifications).map((key) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block font-semibold text-gray-700 dark:text-gray-200"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {key === "year" ? (
              // Special handling for the 'year' field
              <input
                type="number"
                id={key}
                name={key}
                value={specifications[key] || ""}
                onChange={(e) => handleInputChange(e, key)}
                className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
                placeholder="Enter year"
              />
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={specifications[key] || ""}
                onChange={(e) => handleInputChange(e, key)}
                className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
                placeholder={
                  key.toLowerCase() === "dimensions"
                    ? "Enter dimensions (e.g., 2*3)"
                    : ""
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Specifications;
