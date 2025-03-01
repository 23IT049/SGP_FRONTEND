import { useState, useEffect } from "react";
import axios from "axios";
import StatsCard from "../../Admin/Dashboard/Stats/StatsCard";

const StatsList = () => {
    const [statsData, setStatsData] = useState([
        { title: "Total Current Orders", value: "5..." },
        { title: "Total Stamps", value: "6..." },
        { title: "Total Ancillary Items", value: "8..." },
        { title: "PDA Account Holders", value: "14..." },
      ]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [postalCircles, users, pdaAccounts] = await Promise.all([
//           axios.get("http://localhost:5000/api/admin/total-postal-circles"),
//           axios.get("http://localhost:5000/api/admin//total-users"),
//           axios.get("http://localhost:5000/api/admin/total-pda-accounts"),
//         ]);
//         console.log(pdaAccounts);
//         console.log(users)

//         setStatsData((prevStats) => [
//           {
//             title: "Total Current Orders",
//             value: postalCircles.data.totalPostalCircles,
//           },
//           { title: "Total Stamps", value: users.data.totalUsers },
//           { title: "Total Ancillary Items", value: pdaAccounts.data.totalPDAAccounts },
//           prevStats[3],
//         ]);
//       } catch (error) {
//         console.error("Error fetching stats data:", error);
//         setStatsData((prevStats) => [
//           { title: "Total Current Orders", value: "Error" },
//           { title: "Total Stamps", value: "Error" },
//           { title: "Total Ancillary Items", value: "Error" },
//           prevStats[3],
//         ]);
//       }
//     };

//     fetchStats();
//   }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4 p-4">
      {statsData.map((stat, index) => (
        <StatsCard key={index} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
};

export default StatsList;
