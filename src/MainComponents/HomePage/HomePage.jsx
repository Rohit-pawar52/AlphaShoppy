import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from 'axios';
import CategoryShoppy from "../../Filter-components/category-page/CategoryShoppy";
import ProductShoppy from "../product-shoppy/ProductShoppy";
import BodyFooter from "../body-footer/BodyFooter";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';


function Home() {
  const [images, setImages] = useState([]);
 
  
  useEffect(() => {
    // axios.post('https://alpha-shoppy.vercel.app/api/get_slider_images')
    //   .then(response => {
    //     const imageUrls = response.data.data.map(item => item.image);
    //     setImages(imageUrls);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching images:", error);
    //   });
      const images = [
      "images/home-page-images/first.png",
      "images/home-page-images/second.jpg",
      "images/home-page-images/third.jpg"
    ];
    setImages(images)
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="image-slider">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation 
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Slide ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <CategoryShoppy />
      <ProductShoppy />
      <BodyFooter />
    </>
  );
}

export default Home;
