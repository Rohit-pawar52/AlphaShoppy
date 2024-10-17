import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function ProductDescription() {
  const location = useLocation();
  const filteredCategory = location.state;
  const [category, setCategories] = useState(filteredCategory.productCategory);
  const categories = filteredCategory.productsData || [];

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (change) => {
    if (quantity + change > 0) {
      setQuantity(quantity + change);
    }
  };

  const navigate = useNavigate();
  function ProductClick(e) {
    const targetId = e.target.id;
    const ProductCategory = categories.flatMap(section => section.product_details) 
    .find((filteritem) => {
      return filteritem.id === targetId.toString();
    });
    setCategories(ProductCategory);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap the elements
    }
    return array;
  }

  const shuffledArr = shuffleArray(categories);
console.log(category)
  return (
    <>
      <div className="grid justify-center md:flex md:justify-between bg-[#14949d59] px-3 p-5">
        <span className="text-2xl font-semibold text-center">
          {category.name.toUpperCase()}
        </span>
        <div>
          <Link to="/">
            <span
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              Products
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
          <span className="ps-2 text-gray-400">/ {category.category_name}</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 justify-start md:justify-center mx-2 md:mx-10 my-2">
        <div className="relative grid justify-center">
          <img src={category.image} alt="" className="h-64 ms-16 mt-5 md:m-10" />
          <div className="hidden md:block">
            <button className="custom-prev-product">&#10094;</button>
            <button className="custom-next-product">&#10095;</button>
          </div>
        </div>

        <div className="p-2">
          <p className="text-2xl font-semibold leading-8">
            {category.category_name}
          </p>
          <p>{category.name}</p>
          <p className="border mb-2"></p>
          <div className="flex gap-2 items-center opacity-40">
            <span className="text-3xl">★★★★★</span>
            <span className="text-lg">( 0 Reviews )</span>
          </div>
          <div className="flex gap-3 my-3">
            <p className="text-2xl">
              ₹ {category.min_max_price.special_price.toFixed(2)}
            </p>
            <p className="text-xl text-red-600 line-through mt-[-5px]">
              ₹{category.min_max_price.max_price.toFixed(0)}
            </p>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Zipcode"
              className="border border-gray-300 focus:outline-[#49A6A2] px-3 py-1 w-32 md:w-auto"
            />
            <button className="border border-[#49A6A2] px-3 py-1 text-[#49A6A2] rounded-md hover:bg-[#49A6A2] hover:text-white">
              Check Availability
            </button>
          </div>
          <div className="grid grid-cols-3 justify-evenly border-2 w-32 p-1 my-3">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="text" value={quantity} readOnly className="ms-3" />
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="flex gap-2">
            <button className="border-2 border-[#49A6A2] px-2 md:px-3 py-2 text-[#49A6A2] rounded-md hover:bg-[#49A6A2] hover:text-white">
              <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
            </button>
            <button className="border-2 border-[#ed5446] px-2 md:px-3 py-2 text-[#ed5446] rounded-md hover:bg-[#ed5446] hover:text-white">
              <FontAwesomeIcon icon={farHeart} /> Add to Favorite
            </button>
          </div>
          <div className="flex gap-5 my-2 items-center">
            <span>
              Seller{" "}
              <span className="text-[#49A6A2]">{category.seller_name}</span>
            </span>
            <span>
              Tags{" "}
              <span className="bg-slate-400 rounded-md px-1 text-sm">
                {category.tags}
              </span>
            </span>
          </div>
        </div>
      </div>
      <center className="text-3xl p-3">Related Products</center>
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
        {categories.map((category1) =>
          category1.product_details.map((category, index) => (
            <SwiperSlide
              key={index}
              className="text-center border relative grid justify-center rounded-md p-2 cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                id={category.id}
                onClick={ProductClick}
                className="h-52 md:h-48"
              />
              <span className="top-2 left-2 absolute md:top-6 md:left-8 bg-[#49A6A2] text-white px-2 rounded-e-md">
                {category.min_max_price.discount_in_percentage}% OFF
              </span>
              <span className="top-2 right-2 absolute md:top-6 md:right-8">
                <FontAwesomeIcon icon={farHeart} />
              </span>
              <div className="hover:bg-white hover:translate-y-[-10px] hover:delay-300 hover:cursor-grab group leading-7">
                <p className="text-xl font-semibold group-hover:text-[#49A6A2]">
                  {category.name}
                </p>
                <h5 className="font-semibold">
                  &#x20B9; {category.min_max_price.special_price.toFixed(2)}
                </h5>
                <button className="bg-[#49A6A2] rounded-md px-3 py-1">
                  <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                </button>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
}

export default ProductDescription;
