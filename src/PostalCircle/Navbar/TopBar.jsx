import { useState, useEffect, useRef, useContext } from "react";
import { MdTranslate } from "react-icons/md";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import DarkModeContext from "../../context/DarkModeContext";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const TopBar = () => {
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { user, setTemp, setUser } = useAuth();
  const navigate = useNavigate();

  // **Google Translate: Load and Initialize the Widget**
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    const initGoogleTranslate = () => {
      if (!window.google) return;
      const existingElement = document.getElementById('google_translate_element');
      if (existingElement) existingElement.innerHTML = ''; // Clear existing content
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: 'en', 
          includedLanguages: 'as,bn,br,doi,gu,hi,kn,ks,kok,mai,ml,mni,mr,ne,or,pa,sa,sat,sd,ta,te,ur', 
          layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT 
        },
        'google_translate_element'
      );
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    addGoogleTranslateScript();
  }, []);

  const logOut = () => {
    axios
      .post('http://localhost:5000/api/auth/logout')
      .then(() => {
        console.log("logged out...");
        setTemp((prev) => !prev);
        setUser(null);
        localStorage.removeItem("token");
        navigate("/"); 
      })
      .catch((err) => console.log(err));
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  return (
    <div className="bg-gradient-to-r from-[#808000] to-[#a2a220] text-white flex items-center justify-between px-4 md:py-2 py-1">
      <div className="flex items-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
          alt="Indian Flag"
          className="h-4 w-6"
        />
        <span className="hidden md:inline text-xs font-semibold">
          GOVERNMENT OF INDIA
        </span>
      </div>

      <div className="flex items-center md:space-x-4 space-x-2">
        <div className="relative flex items-center">
          {/* <MdTranslate size={24} className="text-white mr-2" /> */}
          
          {/* Google Translate Widget */}
          <div id="google_translate_element" className="text-sm"></div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="text-sm hover:text-gray-200 border-2 border-border-light dark:border-border-dark md:rounded rounded-full p-1"
        >
          {!isDarkMode ? <IoMoon size={20} /> : <IoSunny size={20} />}
        </button>
        
        {!user ? (
          <Link
            to="/auth/login"
            className="bg-primary-light text-primary-dark px-5 py-2 rounded-full hover:opacity-90 transition-colors"
          >
            Login
          </Link>
        ) : (
          <button
            className="bg-primary-light text-primary-dark px-5 py-2 rounded-full hover:opacity-90 transition-colors"
            onClick={logOut}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
