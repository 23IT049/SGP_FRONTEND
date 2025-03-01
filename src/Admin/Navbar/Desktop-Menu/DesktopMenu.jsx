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
    { name: "Dashboard", link: "/admin" },
    {
      name: "Postal Circle",
      link: "/admin/all-postal-circles",
      dropdown: [
        { name: "Create", link: "/admin/create-postal-circle" },
        { name: "See All", link: "/admin/all-postal-circles" },
      ],
    },
    {
      name: "Items",
      link: "/admin/add-items",
      dropdown: [
        { name: "Add", link: "/admin/add-items" },
        { name: "SeeAll", link: "/admin/see-items" },
      ],
    },
    // { name: "Add Items", link: "/admin/add-items" },
    { name: "News", link: "/admin/news" },
    { name: "Events", link: "/admin/events" },
    {
      name: "Help/Support",
      link: "/admin/help",
    },
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

        {/* <UserMenu
          setIsLoggedIn={setIsLoggedIn}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        /> */}
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
