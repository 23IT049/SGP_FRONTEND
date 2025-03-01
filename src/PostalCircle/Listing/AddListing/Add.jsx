import { useState, useEffect } from "react";
import BackButton from "../../../UI/BackButton";
import FormField from "./FormField";
import Specifications from "./Specifications";
import SubmitButton from "./SubmitButton";
import PostalCircleSelect from "./PostalCircleSelect";
import ImageInput from "./ImageInput";
import CategorySelect from "./CategorySelect";
import SubCategorySelect from "./SubCategorySelect";
import PostalStationeryInput from "./PostalStationeryInput";
import OtherItemsInput from "./OtherItemsInput";
import axios from "axios";

function AddPhilatelicItem() {
  const [postalCircles, setPostalCircles] = useState([]);
  const [formData, setFormData] = useState({
    postalCircleId: "",
    name: "",
    description: "",
    category: "",
    subitem: "",
    price: "",
    stock: "",
    imageLink: "",
    postalStationeryValue: "",
    otherItemsValue: "",
    specifications: {
      year: "",
      condition: "",
      dimensions: "",
      rarity: "",
    },
    status: "active",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/postal-circles")
      .then((res) => {
        setPostalCircles(res.data);
      })
      .catch((error) => {
        console.error("Error fetching postal circles:", error);
      });
  }, []);

  const handleInputChange = (e, key) => {
    const { name, value } = e.target;
  
    if ((name === "price" || name === "stock") && value < 0) {
      return;
    }

    if (name === "price" || name === "stock") {
      const numericValue = value === "" ? "" : Number(value);
      setFormData({ ...formData, [name]: numericValue });
      return;
    }
  
    if (name === "subitem") {
      setFormData({
        ...formData,
        subitem: value, 
      });
      return;
    }
  
    if (key) {
      setFormData({
        ...formData,
        [key]: { ...formData[key], [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data: ", formData);

    axios
      .post(`http://localhost:5000/api/philatelic-items`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFormData({
          postalCircleId: "",
          name: "",
          description: "",
          category: "",
          subitem: "",
          price: "",
          stock: "",
          imageLink: "",
          postalStationeryValue: "",
          otherItemsValue: "",
          specifications: {
            year: "",
            condition: "",
            dimensions: "",
            rarity: "",
          },
          status: "active",
        });
      })
      .catch((err) => {
        console.error("Error submitting form data: ", err);
      });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      category: value,
      subitem: "",
      postalStationeryValue: "",
      otherItemsValue: "",
    });
  };

  const categories = [
    "Stamps",
    "Covers",
    "Brochures",
    "Packs",
    "Souvenirs",
    "PostalStationery",
    "OtherItems",
  ];

  const categoryToSubitemType = {
    Stamps: [
      "MintCommemorativeStamps",
      "MintDefinitiveStamps",
      "TopMarginalBlock",
      "BottomMarginalBlock",
      "FullSheet",
    ],
    Covers: [
      "FirstDayCoversAffixed",
      "FirstDayCoversBlank",
      "FirstDayCoverPack",
    ],
    Brochures: ["InformationBrochureAffixed", "InformationBrochureBlank"],
    Packs: [
      "AnnualStampPack",
      "ChildrenSpecialAnnualStampPack",
      "SpecialCollectorsStampPack",
    ],
    Souvenirs: ["MiniSheet/SouvenirSheet"],
    PostalStationery: ["number"],
    OtherItems: ["string"],
  };

  const availableSubcategories = categoryToSubitemType[formData.category] || [];

  return (
    <div className="relative p-6">
      <BackButton />
      <div className="max-w-3xl mx-auto p-6 dark:bg-background-dark rounded-lg shadow-md dark:shadow-text-dark">
        <h1 className="text-3xl text-center font-bold text-primary-dark dark:text-text-dark mb-5">
          Add Philatelic Item
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <PostalCircleSelect
            postalCircles={postalCircles}
            value={formData.postalCircleId}
            onChange={(e) => handleInputChange(e)}
          />
          <FormField
            label="Philatelic Item Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            isTextArea
          />
          <ImageInput
            imageLink={formData.imageLink}
            onChange={handleInputChange}
          />
          <CategorySelect
            value={formData.category}
            onChange={handleCategoryChange}
            categories={categories}
          />
          <SubCategorySelect
            availableSubcategories={availableSubcategories}
            value={formData.subitem}
            onChange={(e) => handleInputChange(e, "subitem")}
          />
          {formData.category === "PostalStationery" && (
            <PostalStationeryInput
              value={formData.postalStationeryValue}
              onChange={handleInputChange}
            />
          )}
          {formData.category === "OtherItems" && (
            <OtherItemsInput
              value={formData.otherItemsValue}
              onChange={handleInputChange}
            />
          )}
          <FormField
            label="Price"
            name="price"
            type="number"
            value={Number(formData.price)}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Stock"
            name="stock"
            type="number"
            value={Number(formData.stock)}
            onChange={handleInputChange}
            required
          />
          <Specifications
            specifications={formData.specifications}
            onChange={(e) => handleInputChange(e, "specifications")}
          />
          <div>
            <label
              htmlFor="status"
              className="block font-semibold text-gray-700 dark:text-gray-200"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border dark:bg-background-dark dark:text-gray-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

export default AddPhilatelicItem;
