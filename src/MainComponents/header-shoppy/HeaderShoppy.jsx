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
import LoginModal from "../login-and-register/LoginModal/LoginModal";
import SideBar from "./sidebar-shoppy/SideBar";

function HeaderShoppy() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  // console.log(userData)
  const toggleModal = () => {
    console.log("Sidebar toggle clicked");
    setShowModal(!showModal);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          "https://alphasilver.productsalphawizz.com/app/v1/api/get_categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  function CategoryNameClick(e) {
    const FilterCategory = categories.find((filteritem) => {
      return filteritem.id == e.target.id;
    });
    navigate(`/NavbarCategory/${FilterCategory.name}`, {
      state: FilterCategory,
    });
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="header-shoppy flex flex-wrap justify-between w-full h-auto relative items-center m-auto p-[1.5rem] md:p-[1rem] gap-2 md:flex md:max-lg:justify-between">
        <div className="flex w-full items-center justify-between md:pe-5">
          <div className="block text-dark text-3xl md:hidden">
            <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
          </div>
          <div className="flex gap-5">
            <Link to="/">
              <img
                src="images/alpha-shoppy-logo/alphashoppy.png"
                className="h-12"
              />
            </Link>
            {/* for desktop */}
            <div className="hidden md:flex md:w-96 h-10 border-2 rounded-md md:justify-between md:items-center md:px-2">
              <input
                type="text"
                className="outline-none"
                placeholder="Search for products"
              />
                <FaSearch/>
            </div>
          </div>
          <div className="hidden md:flex md:gap-3 md:items-center">
            {userData ? (
              <div className="flex items-center gap-1">
                <CgProfile className="h-16 w-6 rounded-full" />
                <span>Hello {userData.username}</span>
                <IoMdPower
                  onClick={() => {
                    localStorage.removeItem("user"), navigate("/");
                  }}
                />
              </div>
            ) : (
              <button className="btn border border-[#49A6A2] font-bold px-2 py-1 rounded-md text-[#49A6A2]" onClick={toggleModal}>
                Login
              </button>
            )}
            <CiHeart className="hidden md:block text-2xl text-[#49A6A2]" />
            <FaCartPlus className="text-2xl text-[#49A6A2]" />
          </div>
          <div className="md:hidden">
            <FaCartPlus className="text-2xl text-[#49A6A2]" />
          </div>
        </div>
        {/* for mobile device */}
        <div className="flex flex-grow-1 w-full border-2 rounded-md items-center rounded-2 justify-between p-2 md:hidden">
          <input type="text" placeholder="Search for products" className="outline-none"/>
            <FaSearch/>
        </div>
      </div>
      <div className="hidden md:flex md:items-center md:justify-evenly md:bg-[#49A6A2] md:text-white md:font-semibold md:text-lg">
        <div className="">
          <Link to="/AllCategoriesShoppy">
            <FontAwesomeIcon icon={faBars} /> See All |
          </Link>
        </div>
        {categories.slice(0, 7).map((category) => (
          <div key={category.id} className="p-2">
            <p id={category.id} onClick={CategoryNameClick}>
              {category.name}
            </p>
          </div>
        ))}
      </div>
      {showModal && <LoginModal onClose={toggleModal} />}
      {isSidebarOpen && (
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
    </>
  );
}

export default HeaderShoppy;
