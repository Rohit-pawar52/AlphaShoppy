import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"; 
import "./NewProductsShoppy.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function NewProductsShoppy() {
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
     axios.post(
          "https://alphasilver.productsalphawizz.com/app/v1/api/get_sections"
        ).then(response=>{
          setCategories(response.data.data[2].product_details);
        }).catch(err=>{
          console.log(err)
        })
  }, []);

  return (
    <>
      <div className="new-product-special">
        <div className="new-product-special-head flex justify-between px-5 my-4 border">
          <div>
            <p className="h3 pt-3">New One</p>
            <p>Special Offer</p>
          </div>
          <div className="pt-5 fw-bold text-teal-600">View More</div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={4}
        navigation={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="new-product-special-swiper mx-5"
      >
        {
          categories.map((category, index) => (
            <SwiperSlide key={`${category.id}-${index}`} className="new-product-special-slide px-5">
              <img
                src={category.image}
                alt={category.name}
                className="new-product-special-image"
              />
              <span className="new-product-special-discount">{category.min_max_price.discount_in_percentage}% OFF</span>
              <span className="new-product-special-heart"><FontAwesomeIcon icon={farHeart} /></span>
              <div className="new-product-special-data">
                <h3 className="new-product-special-name">{category.name}</h3>
                <h5 className="new-product-special-price">
                  &#x20B9; {(category.min_max_price.special_price).toFixed(2)}
                </h5>
                <button className="new-product-special-add-to-cart-btn mb-2">
                  <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                </button>      
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
}

export default NewProductsShoppy;
