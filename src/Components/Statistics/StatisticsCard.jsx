const StatisticsCard = ({ heading, count }) => {
    return (
      <div className="w-64 h-48 bg-primary-dark p-4 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-semibold text-gray-200 mb-2">
          {heading}
        </h3>
        <p className="text-4xl font-bold text-primary-light">
          {count}
        </p>
      </div>
    );
  };
  
  export default StatisticsCard;
  