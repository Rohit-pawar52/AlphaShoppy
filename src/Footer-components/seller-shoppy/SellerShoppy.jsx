import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SellerShoppy() {
    const [category, setCategories] = useState([]);
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://alpha-shoppy.vercel.app/api/get_sellers"
          );
          setCategories(response.data.data);
          console.log(response.data)

        } catch (error) {
          // Handle error here
        }
      };
  
      fetchData();
    }, []);

  return (
    <>
    {/* <div className="grid justify-center md:flex md:justify-between bg-[#14949d59] px-3 p-5">
        <span className="text-2xl font-semibold text-center">
          SELLER LISTING
        </span>
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
            <span> Sellers</span>
          </Link>
          <span className="ps-2 text-gray-400">/ {category.category_name}</span>
        </div>
      </div>
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
          </div> */}
    </>
  );
}

export default SellerShoppy;
