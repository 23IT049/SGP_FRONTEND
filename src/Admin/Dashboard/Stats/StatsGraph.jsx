import DarkModeContext from "../../../context/DarkModeContext";
import { useContext } from "react";
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,  
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const getChartOptions = () => {
    const { isDarkMode } = useContext(DarkModeContext);
  
    const gridColor = isDarkMode ? "#D3B000" : "#E5E5E5";  
    const tickColor = isDarkMode ? "#fff" : "#000";  
  
    return {
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
              family: "Arial, sans-serif",
            },
            color: tickColor,
          },
          grid: {
            color: gridColor,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 12,
              family: "Arial, sans-serif",
            },
            color: tickColor, 
          },
          grid: {
            color: gridColor, 
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  };

const TotalOrdersGraph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Orders",
        data: [120, 150, 200, 180, 220, 250],
        fill: false,
        borderColor: "#D3B000",
        backgroundColor: "#D3B000",
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  const options = getChartOptions();

  return (
    <div className="p-4 bg-background-light dark:bg-background-dark rounded-lg shadow-lg dark:border dark:border-border-dark dark:shadow-shadow-dark">
      <h3 className="text-center font-bold mb-4 text-text-light dark:text-text-dark">
        Total Orders of 6 Months
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
};

const SalesGraph = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales (₹)",
        data: [10000, 15000, 20000, 18000, 22000, 25000],
        fill: false,
        borderColor: "#D3B000",
        tension: 0.1,
      },
    ],
  };

  const options = getChartOptions();

  return (
    <div className="p-4 bg-background-light dark:bg-background-dark rounded-lg shadow-lg dark:border dark:border-border-dark dark:shadow-shadow-dark">
      <h3 className="text-center font-bold mb-4 text-text-light dark:text-text-dark">
        Sales (₹) of 6 Months
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

const StatsGraphs = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="flex-1">
        <TotalOrdersGraph />
      </div>
      <div className="flex-1">
        <SalesGraph />
      </div>
    </div>
  );
};

export default StatsGraphs;
