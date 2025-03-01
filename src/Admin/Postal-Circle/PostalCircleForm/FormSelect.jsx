const FormSelect = ({ label, name, value, options, onChange }) => (
    <div className="flex flex-col">
      <label className="font-medium mb-1 text-background-dark dark:text-text-dark">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border rounded-md dark:border-input-dark dark:bg-input-dark dark:text-text-dark dark:bg-background-dark"
        required
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
  
  export default FormSelect;
  