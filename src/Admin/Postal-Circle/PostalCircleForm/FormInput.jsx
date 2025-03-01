const FormInput = ({ label, type, name, value, onChange, placeholder }) => (
    <div className="flex flex-col">
      <label className="font-medium mb-1 text-background-dark dark:text-text-dark">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border rounded-md dark:border-input-dark dark:bg-input-dark dark:text-text-dark dark:bg-background-dark"
        placeholder={placeholder}
        required
      />
    </div>
  );
  
  export default FormInput;
  