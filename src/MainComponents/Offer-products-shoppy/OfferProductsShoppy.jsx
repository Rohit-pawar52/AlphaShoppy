import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"; 
import "./OfferProductsShoppy.css";

function OfferProductShoppy({ limit }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://alphasilver.productsalphawizz.com/app/v1/api/get_sections"
        );
        setCategories(response.data.data[1].product_details);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="offer-product1 flex items-center my-4">
      <div className="offer-product-special-swiper mx-5 flex">
        {
          categories.slice(0, limit).map((category, index) => (
            <div key={`${category.id}-${index}`} className="offer-product-special-slide px-3">
              <img
                src={category.image}
                alt={category.name}
                className="offer-product-special-image"
              />
              <span className="offer-product-special-discount">{category.min_max_price.discount_in_percentage}% OFF</span>
              <span className="offer-product-special-heart"><FontAwesomeIcon icon={farHeart} /></span>
              <div className="offer-product-special-data">
                <h3 className="offer-product-special-name">{category.name}</h3>
                <h5 className="offer-product-special-price">
                  &#x20B9; {(category.min_max_price.special_price).toFixed(2)}
                </h5>
                <button className="offer-product-special-add-to-cart-btn mb-2">
                  <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                </button>      
              </div>
            </div>
          ))
       }
      </div>
      <div className="offer-special-offer">
            <p className="h3 pt-3">Offer</p>
            <p>Special Offer</p>
          <div className="fw-bold text-teal-600">View More</div>
        </div>
        </div>
    </>
  );
}

export default OfferProductShoppy;
