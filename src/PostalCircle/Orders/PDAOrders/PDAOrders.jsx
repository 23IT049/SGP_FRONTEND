import { useEffect, useState } from "react";
import { useStamps } from "../../../context/StampContext";
import BackButton from "../../../UI/BackButton";
import StampCard from "../../../Components/Items/Stamps/StampCard";
import { useNavigate } from "react-router-dom";

export const philatelicCategories = {
  Stamps: [
    "MintCommemorativeStamps",
    "MintDefinitiveStamps",
    "TopMarginalBlock",
    "BottomMarginalBlock",
    "FullSheet",
  ],
  Covers: ["FirstDayCoversAffixed", "FirstDayCoversBlank", "FirstDayCoverPack"],
  Brochures: ["InformationBrochureAffixed", "InformationBrochureBlank"],
  Packs: [
    "AnnualStampPack",
    "ChildrenSpecialAnnualStampPack",
    "SpecialCollectorsStampPack",
  ],
  Souvenirs: ["MiniSheet/SouvenirSheet"],
  Others: ["PostalStationery", "OtherItems"],
};

const AllItemsPage = () => {
  const { stamps } = useStamps();
  const [filteredStamps, setFilteredStamps] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = stamps;

    if (selectedCategories.length > 0 || selectedSubcategories.length > 0) {
      filtered = filtered.filter(
        (stamp) =>
          selectedCategories.includes(stamp.category) ||
          selectedSubcategories.includes(stamp.subitem)
      );

      filtered = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      filtered = filtered.slice(0, 5);
    }

    setFilteredStamps(filtered);

    const checkedItemIds = filtered
      .filter((stamp) => selectedItems.includes(stamp.id || stamp._id))
      .map((stamp) => stamp.id || stamp._id);

    console.log("Checked Item IDs:", checkedItemIds);
  }, [selectedCategories, selectedSubcategories, stamps, selectedItems]);

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
      setSelectedSubcategories((prev) =>
        prev.filter((sub) => !philatelicCategories[category].includes(sub))
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
      setSelectedSubcategories((prev) => [
        ...prev,
        ...philatelicCategories[category],
      ]);
    }
  };

  const handleSubcategoryToggle = (category, subitem) => {
    if (selectedSubcategories.includes(subitem)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((sub) => sub !== subitem)
      );
      const remainingSubcategories = selectedSubcategories.filter(
        (sub) => sub !== subitem && philatelicCategories[category].includes(sub)
      );
      if (remainingSubcategories.length === 0) {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
      }
    } else {
      setSelectedSubcategories([...selectedSubcategories, subitem]);
      const allSelected = philatelicCategories[category].every((sub) =>
        selectedSubcategories.includes(sub)
      );
      if (!selectedCategories.includes(category) && allSelected) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const handleItemSelection = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="relative p-4">
      <BackButton />
      <div className="container mx-auto md:py-5">
        <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark md:mb-3 md:mt-0 mt-1 mb-5">
          All Philatelic Items
        </h1>
        <button
          onClick={() =>
            navigate("/postal/pda-orders/users", {
              state: { selectedItems, selectedSubcategories }, 
            })
          }
          className="absolute top-4 right-4 p-2 bg-primary-dark text-white rounded"
        >
          Find Users
        </button>
        <div className="flex flex-col md:flex-row">
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-1/5 p-4 border-r border-gray-300 dark:border-gray-600`}
          >
            <h2 className="text-primary-dark dark:text-text-dark font-semibold mb-4 text-2xl">
              Filters
            </h2>
            <div className="mb-6">
              {Object.entries(philatelicCategories).map(
                ([category, subitem]) => (
                  <div key={category} className="mb-4">
                    <label className="flex items-center space-x-2 dark:text-text-dark">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="form-checkbox"
                      />
                      <span className="font-medium">{category}</span>
                    </label>
                    <div className="ml-4 mt-2 space-y-1">
                      {subitem.map((subcategory) => (
                        <label
                          key={subcategory}
                          className="flex items-center space-x-2 dark:text-text-dark"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubcategories.includes(
                              subcategory
                            )}
                            onChange={() =>
                              handleSubcategoryToggle(category, subcategory)
                            }
                            className="form-checkbox"
                          />
                          <span>{subcategory}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <button
            className="block md:hidden p-2 mb-4 bg-primary-dark text-white rounded"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <div className="w-full md:w-3/4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStamps.length > 0 ? (
                filteredStamps.map((stamp) => (
                  <div key={stamp.id || stamp._id} className="relative">
                    <StampCard stamp={stamp} />
                    {selectedSubcategories.length > 0 && (
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedItems.includes(
                            stamp.id || stamp._id
                          )}
                          onChange={() =>
                            handleItemSelection(stamp.id || stamp._id)
                          }
                        />
                        <span className="ml-2">Select</span>
                      </label>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-lg text-gray-500">
                  No items found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllItemsPage;
