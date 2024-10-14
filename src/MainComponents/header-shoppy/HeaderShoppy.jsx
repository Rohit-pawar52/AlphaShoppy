import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPower } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./login-and-register/LoginModal";
import SideBar from "./sidebar-shoppy/SideBar";

function HeaderShoppy() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  // Toggle login modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          "https://alpha-shoppy.vercel.app/api/get_categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle category clicks
const handleCategoryClick = (e, isAll = false) => {
  if (isAll) {
    // Navigate with all categories when "See All" is clicked
    navigate("/NavbarCategory", {
      state: { data: categories }, // Pass all categories data
    });
  } else {
    // Find the specific category by ID and navigate with its data
    const filterCategory = categories.find(
      (category) => category.id == e.target.id
    );
    if (filterCategory) {
      navigate(`/NavbarCategory/${filterCategory.name}`, {
        state: { data: filterCategory }, // Pass specific category data
      });
    }
  }
};


  // Toggle sidebar for mobile devices
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="header-shoppy flex flex-wrap justify-between w-full h-auto relative items-center m-auto p-[1.5rem] md:p-[1rem] gap-2 md:flex md:max-lg:justify-between">
        <div className="flex w-full items-center justify-between md:pe-5">
          {/* Mobile sidebar toggle */}
          <div className="block text-dark text-3xl md:hidden">
            <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
          </div>
          <div className="flex gap-5">
            <Link to="/">
              <img
                src="images/alpha-shoppy-logo/alphashoppy.png"
                className="h-12"
                alt="Alpha Shoppy Logo"
              />
            </Link>
            {/* Desktop search bar */}
            <div className="hidden md:flex md:w-96 h-10 border-2 rounded-md md:justify-between md:items-center md:px-2">
              <input
                type="text"
                className="outline-none"
                placeholder="Search for products"
              />
              <FaSearch />
            </div>
          </div>
          <div className="hidden md:flex md:gap-3 md:items-center">
            {userData ? (
              <div className="flex items-center gap-1">
                <CgProfile className="h-16 w-6 rounded-full" />
                <span>Hello, {userData.username}</span>
                <IoMdPower
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                />
              </div>
            ) : (
              <button
                className="btn border border-[#49A6A2] font-bold px-2 py-1 rounded-md text-[#49A6A2]"
                onClick={toggleModal}
              >
                Login
              </button>
            )}
            <CiHeart className="hidden md:block text-2xl text-[#49A6A2]" />
            <FaCartPlus className="text-2xl text-[#49A6A2]" />
          </div>
          {/* Mobile cart icon */}
          <div className="md:hidden">
            <FaCartPlus className="text-2xl text-[#49A6A2]" />
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="flex flex-grow-1 w-full border-2 rounded-md items-center justify-between p-2 md:hidden">
          <input
            type="text"
            placeholder="Search for products"
            className="outline-none"
          />
          <FaSearch />
        </div>
      </div>

      {/* Categories section for desktop */}
      <div className="hidden md:flex md:items-center md:justify-evenly md:bg-[#49A6A2] md:text-white md:font-semibold md:text-lg">
  {/* See All categories */}
  <div>
    <p onClick={(e) => handleCategoryClick(e, true)} >
    <FontAwesomeIcon icon={faBars} /> See All |
    </p>
  </div>
  
  {/* First 7 categories */}
  {categories.slice(0, 7).map((category) => (
    <div key={category.id} className="p-2">
      <p id={category.id} onClick={handleCategoryClick}>
        {category.name}
      </p>
    </div>
  ))}
</div>


      {/* Modal for login */}
      {showModal && <LoginModal onClose={toggleModal} />}

      {/* Sidebar for mobile */}
      {isSidebarOpen && (
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
    </>
  );
}

export default HeaderShoppy;
