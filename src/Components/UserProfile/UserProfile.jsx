import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UpdateProfile from "../UpdateProfile/UpdteProfile";
import Rewards from "./Rewards/Rewards";
import Help from "../UserProfile/Help/Help";
import Wallet from "./Wallet/Wallet";
import { FaEdit } from "react-icons/fa";
import {toast} from "react-hot-toast";

const UserProfile = () => {
  const { user, currUser, updateUserImage } = useAuth();
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const [isHelpFormOpen, setIsHelpFormOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.image || "");

  const getUsernameFromEmail = (email) => {
    if (!email) return "User";
    return email.split("@")[0];
  };

  console.log("currUser",currUser);
  

  const openUpdateProfile = () => setIsUpdateProfileOpen(true);
  const closeUpdateProfile = () => setIsUpdateProfileOpen(false);
  const openHelpForm = () => setIsHelpFormOpen(true);
  const closeHelpForm = () => setIsHelpFormOpen(false);
  const openRewards = () => setIsRewardsOpen(true);
  const closeRewards = () => setIsRewardsOpen(false);
  const openWallet = () => setIsWalletOpen(true);
  const closeWallet = () => setIsWalletOpen(false);

  const handleEditImage = () => {
    
    document.getElementById("imageInput").click();
   
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImage(file);
      toast.success('Image Edited Successfully !');
    }
  };

  // const {currUser} = useAuth();


  // const handleUploadImage = async () => {
  //   if (selectedImage) {
  //     const formData = new FormData();
  //     formData.append("image", selectedImage);

  //     try {
  //       await updateUserImage(formData);
  //       alert("Image uploaded successfully!");
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       alert("Error uploading image.");
  //     }
  //   } else {
  //     alert("No image selected.");
  //   }
  // };

  console.log(currUser.user.address);
  

  return (
    <>
      <div
        className={`mt-7 flex flex-col md:flex-row items-center md:items-start p-6 space-y-6 md:space-y-0 md:space-x-10 rounded-lg shadow-lg dark:shadow-sm dark:shadow-white max-w-3xl mx-auto ${
          isUpdateProfileOpen || isHelpFormOpen || isRewardsOpen || isWalletOpen
            ? "filter blur-sm"
            : ""
        }`}
      >
        <div className="relative w-40 h-40 flex items-center justify-center overflow-hidden rounded-full border-4 border-gray-300 dark:border-border-dark">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
           ) : currUser?.user.profileImage ? (
            <img
              src={currUser.user.profileImage}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
           ) : (
            <div className="inline-flex items-center justify-center w-40 h-40 bg-gray-100 dark:bg-gray-600 rounded-full">
              <span
                className="font-medium text-6xl dark:text-gray-300"
                style={{ color: "#686800" }}
              >
                {currUser.user?.profileImage}
              </span>
            </div>
          )}
          

          <button
            onClick={handleEditImage}
            className="absolute bottom-2 right-0 z-[99] mb-2 mr-2 text-gray-600 dark:text-primary-dark hover:text-gray-900 dark:hover:text-primary-light opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{
              fontSize: "24px",
            }}
          >
            <FaEdit />
          </button>

          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      

        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold" style={{ color: "#808000" }}>
            {currUser?.user.name ||
              getUsernameFromEmail(currUser?.email) ||
              "User Name"}
          </h1>
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-text-light dark:text-text-dark">
                Email:
              </span>{" "}
              <span className="text-text-light dark:text-text-dark">
                {currUser?.user.email || "NA"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-text-light dark:text-text-dark">
                Mobile No:
              </span>{" "}
              <span className="text-text-light dark:text-text-dark">
                {currUser?.user.phone || "NA"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-text-light dark:text-text-dark">
                State:
              </span>{" "}
              <span className="text-text-light dark:text-text-dark">
                {currUser.user.address.state || "NA"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-text-light dark:text-text-dark">
                Address:
              </span>{" "}
              {currUser?.user.address ? (
                <div className="space-y-1">
                  <p className="text-text-light dark:text-text-dark">
                    {currUser.user.address.street}
                  </p>
                  <p className="text-text-light dark:text-text-dark">
                    {currUser.user.address.city}, {currUser.user.address.state}
                    {/* console.log("Address  : = == ",currUser.user.address.city) */}
                  </p>
                  <p className="text-text-light dark:text-text-dark">
                    {currUser.user.address.pincode}
                  </p>
                  <p className="text-text-light dark:text-text-dark">
                    {currUser.user.address.country}
                  </p>
                </div>
              ) : (
                <span className="text-text-light dark:text-text-dark">NA</span>
              )}
            </div>
          </div>

          <button
            onClick={openUpdateProfile}
            className="mt-4 px-6 py-2 text-white dark:text-dark font-medium rounded hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: "#808000" }}
          >
            Update Profile
          </button>
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        <div
          onClick={openRewards}
          className="p-6 border border-border-light dark:border-border-dark rounded-lg text-center shadow-lg min-h-[160px] min-w-[150px] flex flex-col items-center justify-center cursor-pointer"
          style={{ color: "#808000", fontSize: "1.125rem" }}
        >
          <h2 className="font-bold text-xl">Rewards</h2>
          <p className="text-sm text-primary-dark dark:text-primary-light">
            Check your rewards
          </p>
        </div>

        <div
          onClick={openWallet}
          className="p-6 border border-border-light dark:border-border-dark rounded-lg text-center shadow-lg min-h-[160px] min-w-[150px] flex flex-col items-center justify-center cursor-pointer"
          style={{ color: "#808000", fontSize: "1.125rem" }}
        >
          <h2 className="font-bold text-xl">Wallet</h2>
          <p className="text-sm text-primary-dark dark:text-primary-light">
            Check Your Balance
          </p>
        </div>

        <Link to="/user-profile/orders">
          <div
            className="p-6 border border-border-light dark:border-border-dark rounded-lg text-center shadow-lg cursor-pointer min-h-[160px] min-w-[150px] flex flex-col items-center justify-center"
            style={{ color: "#808000", fontSize: "1.125rem" }}
          >
            <h2 className="font-bold text-xl">Orders</h2>
            <p className="text-sm text-primary-dark dark:text-primary-light">
              Check Your Orders
            </p>
          </div>
        </Link>

        <Link to="/user-profile/favourites">
          <div
            className="p-6 border border-border-light dark:border-border-dark rounded-lg text-center shadow-lg min-h-[160px] min-w-[150px] flex flex-col items-center justify-center"
            style={{ color: "#808000", fontSize: "1.125rem" }}
          >
            <h2 className="font-bold text-xl">Favourites</h2>
            <p className="text-sm text-primary-dark dark:text-primary-light">
              Check Your Favourites
            </p>
          </div>
        </Link>

        <div
          onClick={openHelpForm}
          className="p-6 border border-border-light dark:border-border-dark rounded-lg text-center shadow-lg min-h-[160px] min-w-[150px] flex flex-col items-center justify-center cursor-pointer"
          style={{ color: "#808000", fontSize: "1.125rem" }}
        >
          <h2 className="font-bold text-xl">Help</h2>
          <p className="text-sm text-primary-dark dark:text-primary-light">
            Need Assistance?
          </p>
        </div>
      </div>

      {isHelpFormOpen && <Help onClose={closeHelpForm} />}
      {isRewardsOpen && <Rewards onClose={closeRewards} currUser={currUser} />}
      {isWalletOpen && <Wallet onClose={closeWallet} currUser={currUser} />}
      {isUpdateProfileOpen && (
        <UpdateProfile
          user={user}
          onUpdate={(updatedUser) => {
            console.log("Updated User Data:", updatedUser);
            closeUpdateProfile();
          }}
        />
      )}
    </>
  );
};

export default UserProfile;
