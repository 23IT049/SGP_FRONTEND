import { useState } from "react";
import MenuItems from "./MenuItems";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import { FaSearch } from "react-icons/fa";

const DesktopMenu = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearch = () => {
    console.log("Search clicked");
  };

  const menuItems = [
    { name: "Community", link: "/postal/community" },
    {
      name: "Listing",
      link: "/postal/my-listing",
      dropdown: [
        { name: "Add", link: "/postal/add-items" },
        { name: "See All", link: "/postal/my-listing" },
      ],
    },
    {
      name: "Orders",
      link: "/postal/orders",
      dropdown: [
        { name: "PDA Users", link: "/postal/pda-orders" },
        { name: "Normal Users", link: "/postal/orders" },
      ],
    },
    { name: "Transactions", link: "/postal/transactions" },
    { name: "News", link: "/postal/news" },
    { name: "Events", link: "/postal/events" },
    { name: "Shipping", link: "/postal/track-orders" },
    // { name: "Help", link: "/postal" },
  ];

  return (
    <nav className="hidden md:flex space-x-10">
      <MenuItems items={menuItems} />
      <div className="flex items-center space-x-5 relative">
        <button
          onClick={toggleSearchBar}
          className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark"
        >
          <FaSearch className="cursor-pointer" size={20} />
        </button>

        <UserMenu
          setIsLoggedIn={setIsLoggedIn}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </div>

      <SearchBar
        searchVisible={searchVisible}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
    </nav>
  );
};

export default DesktopMenu;
