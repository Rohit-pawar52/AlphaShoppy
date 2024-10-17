import {Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";

function FilterProductShoppy() {

  // code for FilterProductShoppy
  const location = useLocation();
  const [filteredCategory, setFilteredCategory] = useState(
    JSON.parse(localStorage.getItem("filteredCategory")) || null
  );
  const [sortValue, setSortValue] = useState("relevance");
  const [itemsToShow, setItemsToShow] = useState(12);

  useEffect(() => {
    if (location.state) {
      setFilteredCategory(location.state);
      localStorage.setItem("filteredCategory", JSON.stringify(location.state));
    }
  }, [location.state]);

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  const handleItemsChange = (event) => {
    setItemsToShow(event.target.value);
  };

  // code for Productindividual
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://alpha-shoppy.vercel.app/api/get_products");
        if (response.data && response.data.data) {
          setCategories(response.data.data);
        } else {
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchData();
  }, []);

  const [productsData, setProductsData] = useState([]); // Initialize as an empty array
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
          setProductsData(updatedData);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        console.error("Error fetching sections:", err.message);
      }
    };
    

    fetchSections();
  }, []);
  
  function ProductClick(e) {
    const targetId = e.target.id; 
    const productCategory = categories.find((filteritem) => {
      return filteritem.id === targetId.toString();
    });
  console.log(productsData)
    navigate(`/ProductDescription/${filteredCategory[0]?.name}`, {
      state: {productCategory, productsData},
    });
  }

  if (!filteredCategory) {
    return <p>No products available</p>;
  }
  if (Array.isArray(filteredCategory)) {
    return (
      <>
        <div className="grid justify-center md:flex md:justify-between bg-[#14949d59] px-3 p-5">
            <span className="text-2xl font-semibold text-center">{filteredCategory[0].category_name}</span>
            <div>
              <Link to="/">
                <span
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  Home
                </span>
              </Link>{" "}
              /
              <Link
                to="/AllCategoriesShoppy"
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                <span> Category</span>
              </Link>
              <span
                className="ps-2 text-gray-400"
              >
                / Products
              </span>
            </div>
          </div>
        <div className="bg-gray-50 m-5 p-5 md:m-12 md:p-10 border-2">
          <div className="grid gap-5 justify-center md:flex md:justify-between m-5">
            <div className="flex md:gap-5 items-center">
              <label htmlFor="">
                Sort By:
              </label>
              <select
                id=""
                value={sortValue}
                onChange={handleSortChange}
                className="border-2 p-1"
              >
                <option value="relevance">Relevance</option>
                <option value="top-rated">Top Rated</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low-high">Price - Low To High</option>
                <option value="price-high-low">Price - High To Low</option>
              </select>
            </div>
            <div className="flex gap-5 items-center">
              <label htmlFor="">
                Show:
              </label>
              <select
                id=""
                value={itemsToShow}
                onChange={handleItemsChange}
                className="border-2 p-1"
              >
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20</option>
                <option value="24">24</option>
              </select>
            </div>
          </div>
          <p className="text-2xl md:m-5">Products</p>
          <div className="grid md:flex gap-6 md:m-5">
            {filteredCategory.map((category, index) => (
              <div
                key={`${category.id}-${index}`}
                className="border-2 px-5 pb-2 relative text-center rounded-md cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  id={category.id}
                  onClick={ProductClick}
                  className="w-[250px h-[250px]"
                />
                <span className="top-2 left-2 absolute md:top-3 md:left-2 bg-[#49A6A2] text-white px-2 rounded-e-md">
                  {category.min_max_price.discount_in_percentage}% OFF
                </span>
                <span className="top-2 right-2 absolute md:top-3 md:right-1">
                  <FontAwesomeIcon icon={farHeart} />
                </span>
                <div className="hover:bg-white hover:translate-y-[-10px] hover:delay-300 hover:cursor-grab group leading-7">
                  <h3 className="text-xl font-semibold group-hover:text-[#49A6A2]">{category.name}</h3>
                  <h5 className="font-semibold">
                    &#x20B9; {category.min_max_price.special_price}
                  </h5>
                  <button className="bg-[#49A6A2] rounded-md px-3 py-1">
                    <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default FilterProductShoppy;
