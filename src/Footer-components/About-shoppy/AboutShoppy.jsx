import React from "react";
import { Link } from "react-router-dom";
function AboutShoppy() {
  return (
    <>
      <div className="all-baby-care-head">
        <div className="Seller-Shoppy-head flex justify-between px-3">
          <div className="left">
            <span className="h3">About Us</span>
          </div>
          <div className="right">
          <Link to="/" style={{textDecoration:"none",color:"black"}}><span className="pe-2">Home</span></Link> /
            <span className="ps-2" style={{ color: "grey", cursor: "pointer" }}>
            About Us
            </span>
          </div>
        </div>
        <div className="baby-carebody my-5 text-justify p-4">
          <center className="h2">About Us</center>
          <p>
            Alpha Silver is online store and wholesale dealer in India dealing
            in all Home Appliances With over 10,000 products and over a 1000
            brands in our catalogue you will find everything you are looking for
            Right from TV, Washing Machine, Refrigerator, AC, Air Coolers, Audio
            Devices(Headphones/Speakers), Gas Stoves, Electric Stoves Etc..,
            Choose from a wide range of options in every category, exclusively
            handpicked to help you find the best quality available at the lowest
            prices. We will Deliver with In 24 hours. In case of any queries or
            further details feel free to write to Us on support@alphasilver.in
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutShoppy;
