import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import "./CategoryShoppy.css";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const CategoryShoppy = () => {
  const swiperRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  function CategoryClick(e) {
    const FilterCategory = categories.find((filteritem) => {
      return filteritem.id == e.target.id;
    });
    navigate(`/NavbarCategory/${FilterCategory.name}`, {
      state: FilterCategory,
    });
  }

  return (
    <>
      <div className="py-5">
        <div className="text-3xl font-semibold text-center">Category</div>
        <Swiper
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
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
              slidesPerView: 7,
              spaceBetween: 50,
            },
          }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper py-5"
        >
          <div className="custom-prev">
            <FaChevronLeft />
          </div>
          <div className="custom-next">
            <FaChevronRight />
          </div>
          {categories.map((item) => (
            <div>
              <SwiperSlide>
                <img
                  src={item.image}
                  alt=""
                  id={item.id}
                  onClick={CategoryClick}
                  className=" m-auto border-2 h-32 w-32 border-[#49a6a2] rounded-full cursor-pointer"
                />
                <p className="text-center">{item.name}</p>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
      <div className="border-b border-b-grey-500"></div>
    </>
  );
};

export default CategoryShoppy;
