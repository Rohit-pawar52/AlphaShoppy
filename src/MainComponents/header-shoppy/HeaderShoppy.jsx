import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPower } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./login-and-register/LoginModal";
import SideBar from "./sidebar-shoppy/SideBar";

function HeaderShoppy() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [section, setSection] = useState([]);
  const [filterSection, setFilterSection] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown
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
        const response = await axios.post("https://alpha-shoppy.vercel.app/api/get_categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch sections from the API
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.post("https://alpha-shoppy.vercel.app/api/get_sections");
        if (response.data && response.data.data) {
          const updatedData = response.data.data.map((item) => ({
            title: item.title,
            short_description: item.short_description,
            product_details: item.product_details,
          }));
          setSection(updatedData);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        console.error("Error fetching sections:", err.message);
      }
    };

    fetchSections();
  }, []);

  // Handle search input change
  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm !== "") {
      const filteredData = section
        .flatMap((item) => item.product_details)
        .filter((category) => category.name.toLowerCase().includes(searchTerm));
      console.log(filteredData);
      setFilterSection(filteredData);
      setIsDropdownOpen(true); // Open dropdown when there are results
    } else {
      setFilterSection([]);
      setIsDropdownOpen(false); // Close dropdown when input is empty
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close dropdown if click is outside
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // to naviage to navbarvategory
  const CategoryNameClick = (e) => {
    const FilterCategory = categories.find((filteritem) => {
      return filteritem.id == e.target.id;
    });
    navigate(`/NavbarCategory/${FilterCategory.name}`, {
      state: FilterCategory,
    });
  };

  // Toggle sidebar for mobile devices
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // for naviagating from search data to productdescription
  const searchDataClick = (e) => {
    const FilterCategory = categories.find((filteritem) => {
      return filteritem.id == e.target.id;
    });
    navigate(`/NavbarCategory/${FilterCategory.name}`, {
      state: FilterCategory,
    });
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
            <div className="hidden md:flex md:w-96 h-11 border-2 rounded-md md:justify-between md:items-center md:px-2 relative">
              <input
                type="text"
                className="outline-none"
                placeholder="Search for products"
                onChange={handleInputChange}
              />
              <FaSearch />
              {/* search based data show */}
              <div
                ref={dropdownRef}
                className={`${
                  filterSection.length === 0 ? "hidden" : isDropdownOpen ? "block" : "hidden"
                } absolute bg-white w-full top-16 left-0 z-10 rounded-md px-5 ${
                  filterSection.length > 2 ? "h-64" : "h-auto"
                } overflow-y-scroll`}
              >
                {filterSection.map((data) => (
                  <div key={data.id} className="flex gap-5 my-5">
                    <img src={data.image} alt="" className="h-16 w-14 rounded-md" />
                    <div>
                      <p className="text-xl">{data.name}</p>
                      <p>In {data.category_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* userdata and icon */}
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
        <div className="flex flex-grow-1 w-full border-2 rounded-md items-center justify-between p-2 md:hidden relative">
          <input
            type="text"
            placeholder="Search for products"
            className="outline-none"
            onChange={handleInputChange}
          />
          <FaSearch />
          {/* search based data show */}
          <div
                ref={dropdownRef}
                className={`${
                  filterSection.length === 0 ? "hidden" : isDropdownOpen ? "block" : "hidden"
                } absolute bg-white w-full top-16 left-0 z-10 rounded-md px-5 ${
                  filterSection.length > 2 ? "h-64" : "h-auto"
                } overflow-y-scroll`}
              >
                {filterSection.map((data) => (
                  <div key={data.id} className="flex gap-5 my-5">
                    <img src={data.image} alt="" className="h-16 w-14 rounded-md" />
                    <div>
                      <p className="text-xl">{data.name}</p>
                      <p>In {data.category_name}</p>
                    </div>
                  </div>
                ))}
              </div>
        </div>
      </div>

      {/* Categories section for desktop */}
      <div className="hidden md:flex md:items-center md:justify-evenly md:bg-[#49A6A2] md:text-white md:font-semibold md:text-lg">
        {/* See All categories */}
        <div>
          <Link to="/AllCategoriesShoppy">
            <FontAwesomeIcon icon={faBars} /> See All |
          </Link>
        </div>

        {/* First 7 categories */}
        {categories.slice(0, 7).map((category) => (
          <div key={category.id} className="p-2">
            <p id={category.id} onClick={CategoryNameClick}>
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
