import {Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "./FilterProductShoppy.css";
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
        const response = await axios.post(
          "https://alphasilver.productsalphawizz.com/app/v1/api/get_products"
        );
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
  
  function ProductClick(e) {
    const targetId = e.target.id; 
    const FilterCategory = categories.filter((filteritem) => {
      return filteritem.id === targetId.toString();
    });
  
    navigate(`/ProductIndividualShoppy/${filteredCategory[0]?.name}`, {
      state: FilterCategory,
    });
  }

  if (!filteredCategory) {
    return <p>No products available</p>;
  }
  if (Array.isArray(filteredCategory)) {
    return (
      <>
        <div className="clothing-head flex justify-between px-3">
          <div className="left">
            <span className="h3">{filteredCategory[0]?.category_name}</span>
          </div>
          <div className="right">
          <Link to="/" style={{textDecoration:"none",color:"black"}}><span className="list-inline-item" onClick={()=>{window.scroll(0,0)}}>Home</span></Link>
           /<Link to="/AllCategoriesShoppy" style={{textDecoration:"none",color:"black"}} onClick={()=>{window.scroll(0,0)}}><span> Category</span></Link>
            <span className="ps-2" style={{ color: "grey" }}> / Products</span>
          </div>
        </div>
        <div className="filter-products-container">
          <div className="Seller-Shoppy-dropdowns px-5">
            <div className="Seller-Shoppy-sort-dropdown">
              <label htmlFor="Seller-Shoppy-sortby" className="Seller-Shoppy-dropdown-label pe-5">
                Sort By:
              </label>
              <select
                id="Seller-Shoppy-sortby"
                value={sortValue}
                onChange={handleSortChange}
                className="Seller-Shoppy-dropdown"
              >
                <option value="relevance">Relevance</option>
                <option value="top-rated">Top Rated</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low-high">Price - Low To High</option>
                <option value="price-high-low">Price - High To Low</option>
              </select>
            </div>
            <div className="Seller-Shoppy-show-dropdown">
              <label htmlFor="Seller-Shoppy-show-items" className="Seller-Shoppy-dropdown-label">
                Show:
              </label>
              <select
                id="Seller-Shoppy-show-items"
                value={itemsToShow}
                onChange={handleItemsChange}
                className="Seller-Shoppy-dropdown"
              >
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20</option>
                <option value="24">24</option>
              </select>
            </div>
          </div>
          <h2 className="ps-4">Products</h2>
          <div className="filter-product-shoppy-swiper mx-4">
            {filteredCategory.map((category, index) => (
              <div
                key={`${category.id}-${index}`}
                className="filter-product-shoppy-slide px-5 mb-5"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  id={category.id}
                  onClick={ProductClick}
                  className="filter-product-shoppy-image"
                />
                <span className="filter-product-shoppy-discount">
                  {category.min_max_price.discount_in_percentage}% OFF
                </span>
                <span className="filter-product-shoppy-heart">
                  <FontAwesomeIcon icon={farHeart} />
                </span>
                <div className="filter-product-shoppy-data">
                  <h3 className="filter-product-shoppy-name">{category.name}</h3>
                  <h5 className="filter-product-shoppy-price">
                    &#x20B9; {category.min_max_price.special_price}
                  </h5>
                  <button className="filter-product-shoppy-add-to-cart-btn mb-2">
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
