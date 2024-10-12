import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "./ProductShoppy.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

function ProductShoppy() {
  const [productsData, setProductsData] = useState([]); // Initialize as an empty array
  const swiperRef = useRef(null);

  useEffect(() => {  
    const fetchSections = async () => {
      try {
        const response = await axios.post(
          "https://alphasilver.productsalphawizz.com/app/v1/api/get_sections"
        );

        const updatedData = response.data.data.map((item) => {
          console.log(response.data.data)
          // Create an updated structure that includes product details and title
          return {
            title: item.title,
            short_description: item.short_description,
            product_details: item.product_details,
          };
        });

        console.log(updatedData); // Ensure data is coming as expected
        setProductsData(updatedData); // Set the correct data
      } catch (err) {
        console.error(err);
      }
    };

    fetchSections();
  }, []);

  // Handle navigation to product description
  const navigate = useNavigate();
  const ProductClick = (e) => {
    const productCategory = productsData
      .flatMap(section => section.product_details) // Combine product_details arrays
      .find((item) => item.id === e.target.id);

    if (productCategory) {
      navigate(`/ProductDescription/${productCategory.name}`, {
        state: { productCategory, productsData },
      });
    }
  };

  return (
    <>
      {productsData.length > 0 ? (
        productsData.map((section, index) => (
          <div key={index} className="mt-5">
            {index !== 1 ? ( 
              <>
                <div className="flex justify-between m-auto border-b border-opacity-10 px-3 md:px-12">
                  <div className="pt-3 opacity-90 mb-4">
                    <p className="text-xl md:text-3xl font-semibold">{section.title}</p>
                    <p className="text-xl">{section.short_description}</p>
                  </div>
                  <div className="pt-5 fw-bold text-teal-600">View More</div>
                </div>

                <Swiper
                     pagination={{
                      clickable: true,
                     }}
                   breakpoints={{
                     640: {
                       slidesPerView: 2,
                       spaceBetween: 20,
                     },
                     768: {
                       slidesPerView: 4,
                       spaceBetween: 40,
                     },
                     1024: {
                       slidesPerView: 5,
                       spaceBetween: 0,
                     },
                   }}
                   navigation={true}
                     modules={[Navigation]}
                     className="my-5"
                   >
                  {section.product_details && section.product_details.map((category, catIndex) => (
                    <SwiperSlide key={`${category.id}-${catIndex}`}>
                      <div className="text-center border relative grid justify-center rounded-md p-2">
                      <img
                        src={category.image}
                        alt={category.name}
                        id={category.id}
                        onClick={ProductClick}
                        className="h-52 md:h-48"
                      />
                      <p className="top-2 left-2 absolute md:top-6 md:left-8 bg-[#49A6A2] text-white px-2 rounded-e-md">
                        {category.min_max_price?.discount_in_percentage || 0}% OFF
                      </p>
                      <span className="top-2 right-2 absolute md:top-6 md:right-8 ">
                        <FontAwesomeIcon icon={farHeart} />
                      </span>
                      <div className="product-data">
                        <h5>{category.name}</h5>
                        <h6 className="font-semibold">
                          &#x20B9; {(category.min_max_price?.special_price || 0).toFixed(2)}
                        </h6>
                        <button className="add-to-cart-btn">
                          <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                        </button>
                      </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="border-b-2 border-b-grey-900"></div>
              </>
            ) : (
              <>
              <div className="grid grid-cols-2 md:grid-cols-6 my-4">
                {section.product_details && section.product_details.slice(0, 5).map((category, catIndex) => (
                  <div key={`${category.id}-${catIndex}`} className="text-center border relative grid justify-center rounded-md p-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      id={category.id}
                      onClick={ProductClick}
                      className="h-44 md:h-48 w-full px-3"
                    />
                    <span className="top-2 left-0 absolute md:top-6 md:left-2 bg-[#49A6A2] text-white px-2 rounded-e-md">
                      {category.min_max_price?.discount_in_percentage || 0}% OFF
                    </span>
                    <span className="top-0 right-1 absolute md:top-6 md:right-2">
                      <FontAwesomeIcon icon={farHeart} />
                    </span>
                    <div className="product-data">
                      <h5>{category.name}</h5>
                      <p className="font-semibold">
                        &#x20B9; {(category.min_max_price?.special_price || 0).toFixed(2)}
                      </p>
                      <button className="add-to-cart-btn">
                        <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
                <div className="m-auto">
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.short_description}</p>
                  </div>
                  <div className="fw-bold text-teal-600">View More</div>
                </div>
              </div>
               <div className="border-b-2 border-b-grey-900"></div>
               </>
            )}
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </>
  );
}

export default ProductShoppy;
