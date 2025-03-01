import StatisticsCard from './StatisticsCard'

function Statistics() {
  return (
    <div className="flex flex-col justify-center items-center h-auto">
        <h1 className="text-3xl text-center font-bold text-primary-dark dark:text-text-dark mb-10">Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <StatisticsCard heading="Total Postal Circles" count="48+" />
        <StatisticsCard heading="Total Philatelic Items" count="500+" />
      </div>
    </div>
  );
}

export default Statistics;
