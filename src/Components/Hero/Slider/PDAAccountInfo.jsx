import { FaMoneyBillWave, FaStar, FaNewspaper } from "react-icons/fa";

const PDAAccountInfo = () => {
  const info = [
    {
      title: "Easy Payments",
      description:
        "Simplify your stamp purchases with a Philatelic Deposit Account. Add funds and buy with ease.",
      icon: (
        <FaMoneyBillWave className="w-6 h-6 text-primary-dark dark:text-primary-light" />
      ),
    },
    {
      title: "Exclusive Access",
      description:
        "Get early access to new stamp releases and special editions with your PDA account.",
      icon: (
        <FaStar className="w-6 h-6 text-primary-dark dark:text-primary-light" />
      ),
    },
    {
      title: "Newsletter",
      description:
        "Stay updated with our monthly newsletter featuring stamp news and collecting tips.",
      icon: (
        <FaNewspaper className="w-6 h-6 text-primary-dark dark:text-primary-light" />
      ),
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg">
      <h2 className="text-3xl font-bold text-primary-dark dark:text-primary-light text-center">
        PDA Account Benefits
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:mt-16 mt-5">
        {info.map((item, index) => (
          <div
            key={index}
            className="bg-background-light dark:bg-background-dark md:p-6 p-3 rounded-lg border-2 border-border-dark dark:border-border-dark shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3rounded-full">
                {item.icon}
              </div>
              <h3 className="md:text-2xl text-lg font-semibold text-primary-dark dark:text-primary-light">
                {item.title}
              </h3>
            </div>

            <p className=" text-base md:text-lg text-text-light dark:text-text-dark">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDAAccountInfo;
