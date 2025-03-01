const StatsCard = ({ title, value }) => {
  return (
    <div
      className={`bg-primary-dark text-primary-light w-64 h-32 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center text-center`}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-4xl font-semibold">{value}</p>
    </div>
  );
};

export default StatsCard;
