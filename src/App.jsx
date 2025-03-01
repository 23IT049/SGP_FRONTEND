import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import UserProfile from "./Components/UserProfile/UserProfile";
import SignUp from "./Components/Auth/SignUp/SignUp";
import Home from "./Components/Hero/Home/Home";
import AllNewsPage from "./Components/News/AllNewsPage";
import AllEvents from "./Components/Events/AllEvents";
import NewsDetailPage from "./Components/News/NewsDetailPage";
import AllItemsPage from "./Components/Items/Stamps/AllItemsPage";
import AncillaryPage from "./Components/Items/Ancillary/AncillaryPage";
import StampDetailsPage from "./Components/Items/Stamps/StampDetailsPage";
import GuestLayout from "./Layouts/GuestLayout";
import ProtectedAdminRoute from "./Routes/ProtectedAdminRoute";
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Admin/Dashboard/Dashboard";
import PostalCircleForm from "./Admin/Postal-Circle/PostalCircleForm/PostalCircleForm";
import AllPostalCircle from "./Admin/Postal-Circle/AllPostalCircle/AllPostalCircle";
import PostalCircleDetailsPage from "./Admin/Postal-Circle/PostalDetailsPage/PostalCircleDetailsPage";
import MyCart from "./Components/Items/AddToCart/MyCart";
import PDAInfo from "./Components/PDA/Info/PDAInfo";
import PDAForm from "./Components/PDA/Form/PDAForm";
import AddMoney from "./Components/PDA/Wallet/AddMoney";
import News from "./Admin/News/News";
import NewsDetails from "./Admin/News/NewsDetails";
import Orders from "./Components/UserProfile/Orders/Orders";
import Favourites from "./Components/UserProfile/Favourites/Favourites";
import Wishlist from "./Components/UserProfile/Wishlist/Wishlist";
import Help from "./Components/UserProfile/Help/Help";
import Community from "./Components/Community/Community";
import Profile from "./Components/Community/Profile";
import Event from "./Admin/Events/Event";
import AdminHelp from "./Admin/Help/Help";
import ProtectedPostalRoute from "./Routes/ProtectedPostalRoute";
import PostalLayout from "./Layouts/PostalLayout";
import DashboardP from "./PostalCircle/Dashboard/DashboardP";
import Add from "./PostalCircle/Listing/AddListing/Add";
import MyListing from "./Admin/Items/MyListing/MyListing";
import CheckOut from "./Components/Items/CheckOut/CheckOut";
import OrdersP from "./PostalCircle/Orders/Orders";
import Transactions from "./PostalCircle/Transaction/transactionsData";
import OrderTracking from "./PostalCircle/Shipping/OrderTracking";
import AllOrders from "./PostalCircle/Shipping/AllOrders";
import PaymentSuccess from "./Components/PDA/Wallet/PaymentSuccess";
import MediatorHelpPage from "./Components/Mediator/MediatorHelpPage";
import PDAOrders from "./PostalCircle/Orders/PDAOrders/PDAOrders";
import PostalCircleProfile from "./PostalCircle/Profile/PostalCircleProfile";
import { Toaster } from "react-hot-toast";
import PDAUsers from "./PostalCircle/Orders/PDAOrders/PDAUsers";
import AddItems from "./Admin/Items/AddItems";
import UserInfo from "./Components/PDAUser/Account/UserInfo";
import ProtectedPDARoute from "./Routes/ProtectedPDARoute";
import PDALayout from "./Layouts/PDALayout";
import ThemeSelection from "./Components/PDA/Form/ThemeSelection";
import Loader from "./UI/Loader";
import { useState, useEffect } from "react";

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }
   
  let token = localStorage.getItem('token');
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="user/signup" element={<SignUp />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="all-news" element={<AllNewsPage />} />
          <Route path="all-news/:id" element={<NewsDetailPage />} />
          <Route path="all-events" element={<AllEvents />} />
          <Route path="all-items" element={<AllItemsPage />} />
          <Route path="items/stamp/:id" element={<StampDetailsPage />} />
          <Route path="items/my-cart" element={<MyCart />} />
          <Route path="items/my-cart/checkout" element={<CheckOut />} />
          <Route path="pda" element={<PDAInfo />} />
          <Route path="pda/create-account" element={<PDAForm />} />
          <Route path="pda/create-account/add-money" element={<AddMoney />} />
          <Route path="pda/create-account/user-info" element={<UserInfo />} />
          <Route path="all-ancillary-items" element={<AncillaryPage />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="help" element={<Help />} />
          <Route path="community" element={<Community />} />
          <Route path="community/profile" element={<Profile />} />
          <Route path="user-profile/orders" element={<Orders />} />
          <Route path="user-profile/favourites" element={<Favourites />} />
          <Route path="user-profile/wishlist" element={<Wishlist />} />
          <Route path="checkout-success" element={<PaymentSuccess />} />
          <Route path="mediator-help" element={<MediatorHelpPage />} />
        </Route>

        {/* <Route
          path="/user/signup"
          element={
            token!==null ? <Navigate to="/" /> : (<SignUp />)
          }
        />

        <Route
          path="/auth/login"
          element={
            token!==null ? <Navigate to="/" /> : (<Login />)
          }
        /> */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="all-postal-circles" element={<AllPostalCircle />} />
          <Route
            path="all-postal-circles/details/:id"
            element={<PostalCircleDetailsPage />}
          />
          <Route
            path="all-postal-circles/details/:id"
            element={<PostalCircleDetailsPage />}
          />
          <Route path="create-postal-circle" element={<PostalCircleForm />} />
          <Route path="news" element={<News />} />
          <Route path="events" element={<Event />} />
          <Route path="news/:id" element={<NewsDetails />} />
          <Route path="add-items" element={<AddItems />} />
          <Route path="see-items" element={<MyListing />} />
          <Route path="help" element={<AdminHelp />} />
        </Route>

        <Route
          path="postal"
          element={
            <ProtectedPostalRoute>
              <PostalLayout />
            </ProtectedPostalRoute>
          }
        >
          <Route index element={<DashboardP />} />
          <Route path="news" element={<AllNewsPage />} />
          <Route path="events" element={<AllEvents />} />
          <Route path="community" element={<Community />} />
          <Route path="add-items" element={<Add />} />
          <Route path="my-listing" element={<MyListing />} />
          <Route path="orders" element={<OrdersP />} />
          <Route path="pda-orders" element={<PDAOrders />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="track-orders" element={<AllOrders />} />
          <Route path="track-orders/:id" element={<OrderTracking />} />
          <Route path="profile" element={<PostalCircleProfile />} />
          <Route path="pda-orders/users" element={<PDAUsers />} />
        </Route>

        <Route
          path="pda-user"
          element={
            <ProtectedPDARoute>
              <PDALayout />
            </ProtectedPDARoute>
          }
        >
          {/* <Route index element={<DashboardPD />} /> */}
          <Route path="add-info" element={<UserInfo />} />
          <Route path="create-account" element={<PDAForm />} />
          <Route path="create-account/add-money" element={<AddMoney />} />
          <Route path="create-account/theme" element={<ThemeSelection />} />

        </Route>
      </Routes>
    </Router>
  );
};
export default App;

//
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Components/Auth/Login/Login";
// import UserProfile from "./Components/UserProfile/UserProfile";
// import SignUp from "./Components/Auth/SignUp/SignUp";
// import Home from "./Components/Hero/Home/Home";
// import AllNewsPage from "./Components/News/AllNewsPage";
// import AllEvents from "./Components/Events/AllEvents";
// import NewsDetailPage from "./Components/News/NewsDetailPage";
// import AllItemsPage from "./Components/Items/Stamps/AllItemsPage";
// import AncillaryPage from "./Components/Items/Ancillary/AncillaryPage";
// import StampDetailsPage from "./Components/Items/Stamps/StampDetailsPage";
// import GuestLayout from "./Layouts/GuestLayout";
// import ProtectedAdminRoute from "./Routes/ProtectedAdminRoute";
// import AdminLayout from "./Layouts/AdminLayout";
// import Dashboard from "./Admin/Dashboard/Dashboard";
// import PostalCircleForm from "./Admin/Postal-Circle/PostalCircleForm/PostalCircleForm";
// import AllPostalCircle from "./Admin/Postal-Circle/AllPostalCircle/AllPostalCircle";
// import PostalCircleDetailsPage from "./Admin/Postal-Circle/PostalDetailsPage/PostalCircleDetailsPage";
// import MyCart from "./Components/Items/AddToCart/MyCart";
// import PDAInfo from "./Components/PDA/Info/PDAInfo";
// import PDAForm from "./Components/PDA/Form/PDAForm";
// import AddMoney from "./Components/PDA/Wallet/AddMoney";
// import News from "./Admin/News/News";
// import NewsDetails from "./Admin/News/NewsDetails";
// import Orders from "./Components/UserProfile/Orders/Orders";
// import Favourites from "./Components/UserProfile/Favourites/Favourites";
// import Wishlist from "./Components/UserProfile/Wishlist/Wishlist";
// import Help from "./Components/UserProfile/Help/Help";
// import Community from "./Components/Community/Community";
// import Profile from "./Components/Community/Profile";
// import Event from "./Admin/Events/Event";
// import AdminHelp from "./Admin/Help/Help";
// import ProtectedPostalRoute from "./Routes/ProtectedPostalRoute";
// import PostalLayout from "./Layouts/PostalLayout";
// import DashboardP from "./PostalCircle/Dashboard/DashboardP";
// import Add from "./PostalCircle/Listing/AddListing/Add";
// import MyListing from "./Admin/Items/MyListing/MyListing";
// import CheckOut from "./Components/Items/CheckOut/CheckOut";
// import OrdersP from "./PostalCircle/Orders/Orders";
// import Transactions from "./PostalCircle/Transaction/transactionsData";
// import OrderTracking from "./PostalCircle/Shipping/OrderTracking";
// import AllOrders from "./PostalCircle/Shipping/AllOrders";
// import PaymentSuccess from "./Components/PDA/Wallet/PaymentSuccess";
// import MediatorHelpPage from "./Components/Mediator/MediatorHelpPage";
// import PDAOrders from "./PostalCircle/Orders/PDAOrders/PDAOrders";
// import PostalCircleProfile from "./PostalCircle/Profile/PostalCircleProfile";
// import { Toaster } from "react-hot-toast";
// import PDAUsers from "./PostalCircle/Orders/PDAOrders/PDAUsers";
// import AddItems from "./Admin/Items/AddItems";
// import UserInfo from "./Components/PDAUser/Account/UserInfo";
// import ProtectedPDARoute from "./Routes/ProtectedPDARoute";
// import PDALayout from "./Layouts/PDALayout";
// import ThemeSelection from "./Components/PDA/Form/ThemeSelection";
// import Forum from "./Components/Forum/Forum";
// import CircleComponent from "./Components/Forum/CircleComponent ";

// const App = () => {
//   let token = localStorage.getItem("token")
//   console.log(token);
  
//   return (
//     <Router future={{ v7_relativeSplatPath: true }}>
//       <div>
//         <Toaster />
//       </div>
//       <Routes>
//         <Route path="/" element={<GuestLayout />}>
//           <Route index element={<Home />} />
//           {/* <Route path="auth/login" element={<Login />} /> */}
//           {/* <Route path="user/signup" element={<SignUp />} /> */}
//           <Route path="user-profile" element={<UserProfile />} />
//           <Route path="all-news" element={<AllNewsPage />} />
//           <Route path="all-news/:id" element={<NewsDetailPage />} />
//           <Route path="all-events" element={<AllEvents />} />
//           <Route path="all-items" element={<AllItemsPage />} />
//           <Route path="items/stamp/:id" element={<StampDetailsPage />} />
//           <Route path="items/my-cart" element={<MyCart />} />
//           <Route path="items/my-cart/checkout" element={<CheckOut />} />
//           <Route path="pda" element={<PDAInfo />} />
//           <Route path="pda/create-account" element={<PDAForm />} />
//           <Route path="pda/create-account/add-money" element={<AddMoney />} />
//           <Route path="pda/create-account/user-info" element={<UserInfo />} />
//           <Route path="all-ancillary-items" element={<AncillaryPage />} />
//           <Route path="user-profile" element={<UserProfile />} />
//           <Route path="help" element={<Help />} />
//           <Route path="community" element={<Community />} />
//           <Route path="community/profile" element={<Profile />} />
//           <Route path="user-profile/orders" element={<Orders />} />
//           <Route path="user-profile/favourites" element={<Favourites />} />
//           <Route path="user-profile/wishlist" element={<Wishlist />} />
//           <Route path="checkout-success" element={<PaymentSuccess />} />
//           <Route path="mediator-help" element={<MediatorHelpPage />} />
//           <Route path="forum" element={<CircleComponent />} />
//         </Route>

//         <Route
//           path="/user/signup"
//           element={
//             token ? <Navigate to="/" /> : (<SignUp />)
//           }
//         />

//         <Route
//           path="/auth/login"
//           element={
//             token !== null ? <Navigate to="/" /> : (<Login />)
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedAdminRoute>
//               <AdminLayout />
//             </ProtectedAdminRoute>
//           }
//         >
//           <Route index element={<Dashboard />} />
//           <Route path="all-postal-circles" element={<AllPostalCircle />} />
//           <Route
//             path="all-postal-circles/details/:id"
//             element={<PostalCircleDetailsPage />}
//           />
//           <Route
//             path="all-postal-circles/details/:id"
//             element={<PostalCircleDetailsPage />}
//           />
//           <Route path="create-postal-circle" element={<PostalCircleForm />} />
//           <Route path="news" element={<News />} />
//           <Route path="events" element={<Event />} />
//           <Route path="news/:id" element={<NewsDetails />} />
//           <Route path="add-items" element={<AddItems />} />
//           <Route path="see-items" element={<MyListing />} />
//           <Route path="help" element={<AdminHelp />} />
//         </Route>

//         <Route
//           path="postal"
//           element={
//             <ProtectedPostalRoute>
//               <PostalLayout />
//             </ProtectedPostalRoute>
//           }
//         >
//           <Route index element={<DashboardP />} />
//           <Route path="news" element={<AllNewsPage />} />
//           <Route path="events" element={<AllEvents />} />
//           <Route path="community" element={<Community />} />
//           <Route path="add-items" element={<Add />} />
//           <Route path="my-listing" element={<MyListing />} />
//           <Route path="orders" element={<OrdersP />} />
//           <Route path="pda-orders" element={<PDAOrders />} />
//           <Route path="transactions" element={<Transactions />} />
//           <Route path="track-orders" element={<AllOrders />} />
//           <Route path="track-orders/:id" element={<OrderTracking />} />
//           <Route path="profile" element={<PostalCircleProfile />} />
//           <Route path="pda-orders/users" element={<PDAUsers />} />
//         </Route>

//         <Route
//           path="pda-user"
//           element={
//             <ProtectedPDARoute>
//               <PDALayout />
//             </ProtectedPDARoute>
//           }
//         >
//           {/* <Route index element={<DashboardPD />} /> */}
//           <Route path="add-info" element={<UserInfo />} />
//           <Route path="create-account" element={<PDAForm />} />
//           <Route path="create-account/add-money" element={<AddMoney />} />
//           <Route path="create-account/theme-selection" element={<ThemeSelection />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };
// export default App;
