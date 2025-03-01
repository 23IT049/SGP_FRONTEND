import StatsGraphs from "./Stats/StatsGraph"
import StatsList from "./Stats/StatsList"

function Dashboard() {
  return (
    <div className="p-4">
      <StatsList />
      <StatsGraphs />
    </div>
  )
}

export default Dashboard
