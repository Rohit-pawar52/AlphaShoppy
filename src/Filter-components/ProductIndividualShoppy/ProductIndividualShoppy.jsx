import React, { useState, useEffect } from "react";
import "./ProductIndividualShoppy.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

function ProductIndividualShoppy() {
  const location = useLocation();
  const filteredCategory = location.state;
  console.log(filteredCategory);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    if (quantity + change > 0) {
      setQuantity(quantity + change);
    }
  };

  // from navbarcategory bottom products
  const [navcategory, setNavCategories] = useState([])
  useEffect(() => {
    // Retrieve from local storage
    const storedCategory = JSON.parse(localStorage.getItem("filteredCategory"));
    if (storedCategory) {
      setNavCategories(storedCategory);
    }
  }, []);

  return (
    <>
      <div className="product-individual-filter-head flex justify-between px-3 bg-black">
        <div className="left">
          <span className="h3">{filteredCategory[0]?.name}</span>
        </div>
        <div className="right">
        <Link to="/" style={{textDecoration:"none",color:"black"}}><span className="list-inline-item" onClick={()=>{window.scroll(0,0)}}>Home</span></Link> /
        <Link to="/AllCategoriesShoppy" style={{textDecoration:"none",color:"black"}} onClick={()=>{window.scroll(0,0)}}><span> Category</span></Link>
          <span className="ps-2" style={{ color: "grey" }}>
            {" "}
            / Products
          </span>
        </div>
      </div>
      <div className="product-individual-filter flex justify-center item-center">
        <div className="product-individual-filter-swiper mx-4">
          {filteredCategory.map((category, index) => (
            <div
              key={`${category.id}-${index}`}
              className="product-individual-filter-slide p-5"
            >
              {/* <ReactImageMagnify className="product-individual-filter-image"
                {...{
                  smallImage: {
                    alt: "Product Image",
                    width: 250,
                    height: 300,
                    src: category.image,
                  },
                  largeImage: {
                    src: category.image,
                    width: 550,
                    height: 500,
                  },
                  enlargedImagePosition: "beside",
                  isHintEnabled: true,
                  lensStyle: { backgroundColor: "rgba(0,0,0,.8)" },
                  enlargedImageContainerStyle: {
                    marginLeft: "20px",
                    backgroundColor: "white",
                  },
                  enlargedImageContainerDimensions: {
                    width: "400px",
                    height: "400px",
                  },
                  enlargedImageStyle: {
                    objectFit: "cover",
                  },
                }}
              /> */}
               <img src={category.image} alt="" className="h-96"/>
              <button className="prev-arrow">&#10094;</button>
              <button className="next-arrow">&#10095;</button>
            </div>
          ))}
        </div>

        {filteredCategory.map((category, index) => (
          <div
            key={`${category.id}-${index}`}
            className="product-individual-filter-slide pt-5 "
          >
            <div className="product-individual-filter">
              <h3 className="product-individual-filter-name">
                {category.name}
              </h3>
              <p className="product-individual-filter-name">{category.name}</p>
              <p className="border"></p>
              <div className="product-reviews">
                <span className="stars">★★★★★</span>
                <br></br>
                <span className="reviews text-center">( 0 Reviews )</span>
              </div>
              <div className="product-pricing">
                <span className="price h3">
                  ₹ {category.min_max_price.special_price}
                </span>
                <span className="original-price">
                  {category.min_max_price.max_price}
                </span>
              </div>
              <div className="zipcode-check">
                <input type="text" placeholder="Zipcode" />
                <button>Check Availability</button>
              </div>
              <div className="product-quantity">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <input type="text" value={quantity} readOnly />
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
              <div className="product-actions">
                <button className="product-individual-filter-add-to-cart-btn">
                  {" "}
                  <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                </button>
                <button className="add-to-favorite">
                  {" "}
                  <FontAwesomeIcon icon={farHeart} />
                  Add to Favorite
                </button>
              </div>
              <div className="seller-info">
                <span>
                  Seller{" "}
                  <span style={{ color: "blue" }}>{category.seller_name}</span>
                </span>
              </div>
              <div className="product-tags">
                <span className="tag">Tags</span>
                <span className="tag-item">{category.tags}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="product-individual-bottom">
        <p className="m-2 ps-5">{navcategory[0]?.name}</p>
        <center className="h3 p-3">Related Products</center>
        <div className="filter-product-shoppy-swiper m-4">
            {navcategory.map((category, index) => (
              <div
                key={`${category.id}-${index}`}
                className="filter-product-shoppy-slide px-5 mb-5"
              >
                <img
                  src={category.image}
                  alt={category.name}
             
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

export default ProductIndividualShoppy;
