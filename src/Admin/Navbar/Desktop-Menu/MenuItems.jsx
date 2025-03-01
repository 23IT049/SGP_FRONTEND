import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const MenuItems = ({ items }) => {
  return (
    <div className="hidden md:flex space-x-10">
      {items.map((item) => (
        <div key={item.name} className="relative group">
          <NavLink
            to={item.link}
            className="flex items-center font-bold text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-all"
          >
            {item.name}
            {item.dropdown && item.dropdown.length > 0 && (
              <span className="ml-1">
                <AiFillCaretDown className="group-hover:hidden" />
                <AiFillCaretUp className="hidden group-hover:block" />
              </span>
            )}
          </NavLink>

          {item.dropdown && (
            <div className="absolute bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark shadow-lg rounded-lg mt-2 opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-200">
              <ul className="p-2 space-y-2">
                {item.dropdown.map((option, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={option.link || "#"}
                      className="hover:text-accent-light dark:hover:text-accent-dark cursor-pointer"
                    >
                      {option.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
