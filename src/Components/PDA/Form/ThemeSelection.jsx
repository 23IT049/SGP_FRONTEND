import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { showErrorNotification } from "../../../UI/Notification";
import BackButton from "../../../UI/BackButton";

function ThemeSelection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const themesList = [
    "Flowers and Plants",
    "Wild Animals",
    "Marine Life",
    "Insects and Bugs",
    "Birds of the World",
    "Forests and Woodlands",
    "Mountain Ranges",
    "Rivers and Lakes",
    "Desert Ecosystems",
    "Natural Wonders",
    "Famous Landmarks",
    "Historical Monuments",
    "Legendary Heroes and Heroines",
    "Mythological Gods and Deities",
    "Folklore and Legends",
    "Art and Sculpture",
    "Ancient Civilizations",
    "Cultural Festivals",
    "Celebrations and Holidays",
    "Scientific Discoveries and Inventions"
  ];
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("pdaFormData"));
    if (storedData) {
      setFormData(storedData);
    } else {
      navigate("/pda/create-account");
    }
  }, [navigate]);

  const handleThemeSelection = (theme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter((t) => t !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const handleSubmit = async () => {
    if (selectedThemes.length === 0) {
      showErrorNotification("Please select at least one theme.");
      return;
    }

    const finalData = {
      ...formData,
      preferences: {
        ...formData.preferences,
        themes: selectedThemes,
      },
    };

    console.log(finalData);
    

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/pda",
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/pda/create-account/success");
      } else {
        showErrorNotification(
          "Failed to create PDA account. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      showErrorNotification("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative p-4">
        <BackButton />
    <div className="container mx-auto p-6 my-4 bg-background-light shadow-md rounded-lg max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Select Themes</h2>
      <div className="grid grid-cols-2 gap-4">
        {themesList.map((theme) => (
          <div key={theme} className="flex items-center">
            <input
              type="checkbox"
              id={theme}
              value={theme}
              checked={selectedThemes.includes(theme)}
              onChange={() => handleThemeSelection(theme)}
            />
            <label htmlFor={theme} className="ml-2">
              {theme}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="px-5 py-2 bg-primary-dark text-white rounded-md hover:opacity-90 mt-4"
      >
        Submit
      </button>
    </div>
    </div>
  );
}

export default ThemeSelection;
