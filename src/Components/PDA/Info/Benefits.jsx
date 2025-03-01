import { FaCheckCircle } from "react-icons/fa";

const Benefits = ({ benefits }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Benefits of Having a PDA Account
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start">
            <FaCheckCircle className="text-primary-dark text-2xl w-6 h-6 mr-4 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
