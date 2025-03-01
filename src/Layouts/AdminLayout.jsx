import Navbar from "../Admin/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
