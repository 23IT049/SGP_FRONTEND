import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const KeyFeatures = ({ features }) => {
  const [expanded, setExpanded] = useState(0);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Key Features of a PDA Account
      </h2>
      <div className="bg-white dark:bg-background-dark rounded-xl shadow-lg dark:shadow-shadow-dark overflow-hidden">
        {features.map((feature, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700">
            <button
              className="w-full flex justify-between items-center p-4 text-left text-gray-800 dark:text-gray-200 font-medium hover:bg-primary-dark"
              onClick={() => toggleExpand(index)}
            >
              <span>{feature.title}</span>
              {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expanded === index && (
              <div className="p-4 text-gray-700 dark:text-gray-300">
                {feature.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
