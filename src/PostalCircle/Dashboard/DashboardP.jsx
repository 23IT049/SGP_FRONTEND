import PostalCircleDetailsPage from "../../Admin/Postal-Circle/PostalDetailsPage/PostalCircleDetailsPage"
import PostalCircleDashboard from "./PostalCircleDashboard"
import StatsList from "./StatsList"

function DashboardP() {
  return (
    <div className="p-4">
      <StatsList />
      {/* <PostalCircleDetailsPage /> */}
      <PostalCircleDashboard />
    </div>
  )
}

export default DashboardP
