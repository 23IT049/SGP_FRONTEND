const HowToOpenAccount = ({ steps }) => {
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
          How to Open a PDA Account
        </h2>
        <div className="bg-white dark:bg-background-dark rounded-xl shadow-lg dark:shadow-shadow-dark p-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start mb-6">
              <div className="text-primary-dark text-3xl mr-4">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HowToOpenAccount;
  