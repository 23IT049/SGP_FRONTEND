import React, { useState } from "react";
import {toast} from "react-hot-toast";

const Help = ({ onClose }) => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    postalCircle: "",
    orders: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    toast.success('Form Submitted Successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative max-w-2xl w-full mx-auto bg-white dark:bg-background-dark rounded-lg shadow-lg p-6 dark:shadow-dark">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border rounded transition text-black dark:text-primary-light"
          style={{
            border: "none",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="md:text-2xl text-2xl text-center font-bold text-primary-dark dark:text-primary-light md:mb-3 md:mt-0 mt-1 mb-5">
            Help
          </h2>

          <div>
            <label className="block font-medium text-primary-dark dark:text-primary-light">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-primary-dark dark:text-primary-light">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-primary-dark dark:text-primary-light">
              Related Orders
            </label>
            <input
              type="text"
              name="orders"
              value={formData.orders}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
            />
          </div>

          <div>
            <label className="block font-medium text-primary-dark dark:text-primary-light">
              Postal Circle
            </label>
            <input
              type="text"
              name="postalCircle"
              value={formData.postalCircle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:border-border-dark dark:bg-background-dark dark:text-primary-light"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 text-white font-medium rounded hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: "#808000" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Help;
