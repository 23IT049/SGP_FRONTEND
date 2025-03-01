import { useState, useEffect } from "react";
import BackButton from "../../UI/BackButton";
import FormField from "../../PostalCircle/Listing/AddListing/FormField";
import Specifications from "../../PostalCircle/Listing/AddListing/Specifications";
import SubmitButton from "../../PostalCircle/Listing/AddListing/SubmitButton";
import PostalCircleSelect from "../../PostalCircle/Listing/AddListing/PostalCircleSelect";
import ImageInput from "../../PostalCircle/Listing/AddListing/ImageInput";
import CategorySelect from "../../PostalCircle/Listing/AddListing/CategorySelect";
import SubCategorySelect from "../../PostalCircle/Listing/AddListing/SubCategorySelect";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddItems() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subitem: "",
    price: "",
    stock: "",
    image: null,
    isFileUploaded: false,
    isLinkProvided: false,
    specifications: {
      year: "",
      // rarity: "",
    },
    status: "active",
    visibility: "pda_users",
    notify: "pda_users",
  });

  const navigate = useNavigate();

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData({
      ...formData,
      imageLink: url,
      isLinkProvided: url.trim() !== "",
      isFileUploaded: false,
      image: null,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
      isFileUploaded: Boolean(file),
      isLinkProvided: false,
      imageLink: "",
    });
  };

  const handleInputChange = (e, key) => {
    const { name, value } = e.target;
  
    // Handle visibility option
    if (name === "visibility") {
      setFormData({ ...formData, visibility: value });
      return;
    }
    if (name === "notify") {
      setFormData({ ...formData, notify: value });
      return;
    }
  
    if (name === "subitem") {
      // Ensure the subitem is valid for the selected category
      const availableSubcategories = categoryToSubitemType[formData.category] || [];
      if (availableSubcategories.includes(value)) {
        setFormData({
          ...formData,
          subitem: value,
        });
      }
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

    const formDataToSend = new FormData();
    // Append form fields to FormData
    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("category", formData.category || "");
    formDataToSend.append("subitem", formData.subitem || "");
    formDataToSend.append("price", formData.price || "");
    formDataToSend.append("stock", formData.stock || "");
    // formDataToSend.append("status", formData.status);
    formDataToSend.append("visibility", formData.visibility || ""); 
    formDataToSend.append("notify", formData.notify || ""); 

    // Add image file if uploaded
    if (formData.isFileUploaded && formData.image) {
      formDataToSend.append("image", formData.image); // imageFile should match the field name in multer
    }

    // Add specifications if any
    if (formData.specifications?.year) {
      formDataToSend.append(
        "specifications[year]",
        formData.specifications.year
      );
    }
    // if (formData.specifications.rarity) {
    //   formDataToSend.append(
    //     "specifications[rarity]",
    //     formData.specifications.rarity
    //   );
    // }

    console.log("FormData Contents:");
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    
    axios
      .post(`http://localhost:5000/api/admin/create-item`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Important to set the correct Content-Type header for file uploads
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Item added Successfully");
        navigate("/admin/see-items");
        // Reset form data
        setFormData({
          name: "",
          description: "",
          category: "",
          subitem: "",
          price: "",
          stock: "",
          image: null,
          isFileUploaded: false,
          isLinkProvided: false,
          specifications: {
            year: "",
            // rarity: "",
          },
          status: "active",
          visibility: "pda_users",
          notify: "pda_users",
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
      subitem: "",  // Reset subitem when category changes
    });
  };

  const categories = ["Stamps", "Covers", "Brochures", "Packs", "Souvenirs"];

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
          {/* <PostalCircleSelect
            postalCircles={postalCircles}
            value={formData.postalCircleId}
            onChange={(e) => handleInputChange(e)}
          /> */}
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
            onUrlChange={handleUrlChange}
            onFileChange={handleFileChange}
            isFileUploaded={formData.isFileUploaded}
            isLinkProvided={formData.isLinkProvided}
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
          {/* {formData.category === "PostalStationery" && (
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
          )} */}
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
          {/* <div>
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
          </div> */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-200">
              Display this Item to:
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="both"
                  checked={formData.visibility === "both"}
                  onChange={(e) => handleInputChange(e)}
                  className="form-radio text-primary-dark"
                />
                <span className="ml-2">All Users</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="pda_users"
                  checked={formData.visibility === "pda_users"}
                  onChange={(e) => handleInputChange(e)}
                  className="form-radio text-primary-dark"
                  defaultChecked
                />
                <span className="ml-2">PDA Users</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-200">
              Display Notification to:
            </label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="notify"
                  value="both"
                  checked={formData.notify === "both"}
                  onChange={(e) => handleInputChange(e)}
                  className="form-radio text-primary-dark"
                />
                <span className="ml-2">All Users</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="notify"
                  value="pda_users"
                  checked={formData.notify === "pda_users"}
                  onChange={(e) => handleInputChange(e)}
                  className="form-radio text-primary-dark"
                  defaultChecked
                />
                <span className="ml-2">PDA Users</span>
              </label>
            </div>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

export default AddItems;
