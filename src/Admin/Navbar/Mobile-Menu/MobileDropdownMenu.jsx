import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const menuItems = [
  {
    name: "Postal Circle",
    link: "/admin/all-postal-circles",
    dropdown: [
      { name: "Create", link: "/admin/create-postal-circle" },
      { name: "See All", link: "/admin/all-postal-circles" },
    ],
  },
  { name: "Community", link: "/admin" },
  { name: "News", link: "/admin" },
  { name: "Events", link: "/admin" },
  { name: "Items", link: "/admin" },
  {
    name: "Help/Support",
    link: "/admin",
  },
];

const MobileDropdownMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="md:hidden bg-background-light dark:bg-background-dark shadow-lg">
      <ul className="flex flex-col items-start px-4 py-2 space-y-2">
        {menuItems.map((item, index) => (
          <li key={item.name} className="w-full">
            <button
              className="flex items-center font-bold text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark w-full"
              onClick={() => handleDropdownToggle(index)}
            >
              {item.name}
              {item.dropdown && item.dropdown.length > 0 && (
                openDropdown === index ? (
                  <AiFillCaretUp className="ml-1" />
                ) : (
                  <AiFillCaretDown className="ml-1" />
                )
              )}
            </button>

            {item.dropdown && openDropdown === index && (
              <div className="mt-2 space-y-2 pl-4">
                {item.dropdown.map((option, idx) => (
                  <button
                    key={idx}
                    className="flex items-center text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark w-full text-start"
                  >
                    <FaArrowRight className="mr-2" />
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileDropdownMenu;
