import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerShoppy.css";

function SellerShoppy() {
    const [categories, setCategories] = useState([]);
    const [sortValue, setSortValue] = useState('relevance');
    const [itemsToShow, setItemsToShow] = useState(12);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://alphasilver.productsalphawizz.com/app/v1/api/get_products"
          );
          setCategories(response.data.data);
        } catch (error) {
          // Handle error here
        }
      };
  
      fetchData();
    }, []);

    const filteredCategories = categories.filter(
      (category) => category.id === "4" || category.id === "6" || category.id === "8" || category.id === "10"
    );

    const handleSortChange = (event) => {
        setSortValue(event.target.value);
    };

    const handleItemsChange = (event) => {
        setItemsToShow(event.target.value);
    };

  return (
    <>
      <div className="Seller-Shoppy-head flex justify-between px-3">
        <div className="Seller-Shoppy-left">
          <span className="h3">Seller Listing</span>
        </div>
        <div className="Seller-Shoppy-right">
          <span className="pe-2">Home</span> /
          <span
            className="ps-2"
            style={{ color: "grey", cursor: "pointer" }}
          >
            Sellers
          </span>
        </div>
      </div>

      <div className="Seller-Shoppy-body mx-5 p-3">
        <div className="Seller-Shoppy-dropdowns">
          <div className="Seller-Shoppy-sort-dropdown">
            <label htmlFor="Seller-Shoppy-sortby" className="Seller-Shoppy-dropdown-label pe-5">Sort By:</label>
            <select id="Seller-Shoppy-sortby" value={sortValue} onChange={handleSortChange} className="Seller-Shoppy-dropdown">
              <option value="relevance">Relevance</option>
              <option value="top-rated">Top Rated</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low-high">Price - Low To High</option>
              <option value="price-high-low">Price - High To Low</option>
            </select>
          </div>
          <div className="Seller-Shoppy-show-dropdown">
            <label htmlFor="Seller-Shoppy-show-items" className="Seller-Shoppy-dropdown-label">Show:</label>
            <select id="Seller-Shoppy-show-items" value={itemsToShow} onChange={handleItemsChange} className="Seller-Shoppy-dropdown">
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="20">20</option>
              <option value="24">24</option>
            </select>
          </div>
        </div>

        <h3 className="mt-4">Products</h3>
        <div className="Seller-Shoppy-products mx-3 flex flex-wrap justify-around">
          {
            filteredCategories.map((category, index) => (
              <div key={`${category.id}-${index}`} className="Seller-Shoppy-product px-5">
                <img
                  src={category.image}
                  alt={category.name}
                  className="Seller-Shoppy-image"
                />
                <div className="Seller-Shoppy-data">
                  <h3 className="Seller-Shoppy-name">{category.seller_name}</h3>
                  <h5 className="Seller-Shoppy-price">
                    &#x20B9; {category.seller_slug}
                  </h5>
                  <button className="Seller-Shoppy-add-to-cart-btn mb-2">
                   View Products
                  </button>      
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default SellerShoppy;
