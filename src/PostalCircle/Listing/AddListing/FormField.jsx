function FormField({ label, name, type = "text", value, onChange, required = false, isTextArea = false }) {
  return (
    <div>
      <label htmlFor={name} className="block font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
          required={required}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
          required={required}
        />
      )}
    </div>
  );
}

export default FormField;
