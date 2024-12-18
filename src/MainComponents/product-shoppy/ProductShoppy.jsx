import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDispatch } from "react-redux";
import { setCartData } from "../../redux/slicer";
import Swal from 'sweetalert2'

function ProductShoppy() {
  const [productsData, setProductsData] = useState([]); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  

  // Handle navigation to product description
  const ProductClick = (e) => {
    const productCategory = productsData
      .flatMap(section => section.product_details) // Combine product_details arrays
      .filter((item) => item.id === e.target.id);

    if (productCategory) {
      navigate(`/ProductDescription/${productCategory.name}`, {
        state: { productCategory, productsData },
      });
    }
  };

//to send data to cart 
  function handleAddToCartBtn(e) {
    const id = e.target.id;
    if (localStorage.getItem("user") === null) {
      Swal.fire({
        title: 'Login Error:',
        text: 'Do you want to continue Please Login First!!!',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      return;
    }else{
      const findData = productsData
      .flatMap(section => section.product_details) // Combine product_details arrays
      .find((item) => item.id === e.target.id);
      const productToAdd = { ...findData, count: 1 }; 
      dispatch(setCartData(productToAdd));
      Swal.fire({
        title: 'Success',
        text: 'Item Added!',
        confirmButtonText: 'Okay'
      })
    }
  }

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
                      <div className="text-center border relative grid justify-center rounded-md p-2 cursor-pointer">
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
                      <span className="top-2 right-2 absolute md:top-6 md:right-8">
                        <FontAwesomeIcon icon={farHeart} />
                      </span>
                      <div className="hover:bg-white hover:translate-y-[-10px] hover:delay-300 hover:cursor-grab group leading-7">
                        <p className="text-xl font-semibold group-hover:text-[#49A6A2]">{category.name}</p>
                        <h6 className="font-semibold">
                          &#x20B9; {(category.min_max_price?.special_price || 0).toFixed(2)}
                        </h6>
                        <button className="bg-[#49A6A2] rounded-md px-3 py-1" onClick={handleAddToCartBtn}
                    id={category.id}>
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
                  <div key={`${category.id}-${catIndex}`} className="text-center border relative grid justify-center rounded-md p-2 cursor-pointer">
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
                    <div className="hover:bg-white hover:translate-y-[-10px] hover:delay-300 hover:cursor-grab group leading-7">
                      <p className="text-xl font-semibold group-hover:text-[#49A6A2]">{category.name}</p>
                      <p className="font-semibold">
                        &#x20B9; {(category.min_max_price?.special_price || 0).toFixed(2)}
                      </p>
                      <button className="bg-[#49A6A2] rounded-md px-3 py-1" onClick={handleAddToCartBtn}
                    id={category.id}>
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
