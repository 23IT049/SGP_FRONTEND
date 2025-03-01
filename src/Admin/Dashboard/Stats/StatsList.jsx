import { useState, useEffect } from "react";
import axios from "axios";
import StatsCard from "./StatsCard";

const StatsList = () => {
  const [statsData, setStatsData] = useState([
    { title: "Total Postal Circles", value: "Loading..." },
    { title: "Total Users", value: "Loading..." },
    { title: "Total PDA Accounts", value: "Loading..." },
    { title: "Help Count", value: "5" },
  ]);

  const token = localStorage.getItem("token");
  
  

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("inside statsList:", token);
        const [postalCircles, users, pdaAccounts] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/total-postal-circles",{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:5000/api/admin/total-users",{
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the Authorization header
            },
          }),
          axios.get("http://localhost:5000/api/admin/total-pda-accounts",{
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the Authorization header
            },
          }),
        ]);
        console.log(pdaAccounts);
        console.log(users)

        setStatsData((prevStats) => [
          {
            title: "Total Postal Circles",
            value: postalCircles.data.totalPostalCircles,
          },
          { title: "Total Users", value: users.data.totalUsers },
          { title: "Total PDA Accounts", value: pdaAccounts.data.totalPDAAccounts },
          prevStats[3],
        ]);
      } catch (error) {
        console.error("Error fetching stats data:", error);
        setStatsData((prevStats) => [
          { title: "Total Postal Circles", value: "Error" },
          { title: "Total Users", value: "Error" },
          { title: "Total PDA Accounts", value: "Error" },
          prevStats[3],
        ]);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4 p-4">
      {statsData.map((stat, index) => (
        <StatsCard key={index} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
};

export default StatsList;
