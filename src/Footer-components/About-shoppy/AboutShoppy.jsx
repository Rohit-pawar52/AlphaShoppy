import React from "react";
import { Link } from "react-router-dom";
function AboutShoppy() {
  return (
    <>
      <div className="grid justify-center md:flex md:justify-between bg-[#14949d59] px-3 p-5">
        <span className="text-2xl font-semibold text-center">About Us</span>
        <div>
          <Link
            to="/"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <span> Home</span>
          </Link>
          <span className="ps-2 text-gray-400">/ About Us</span>
        </div>
      </div>
      <div className="baby-carebody my-5 text-justify p-4">
        <center className="text-3xl my-3">About Us</center>
        <p>
          Alpha Silver is online store and wholesale dealer in India dealing in
          all Home Appliances With over 10,000 products and over a 1000 brands
          in our catalogue you will find everything you are looking for Right
          from TV, Washing Machine, Refrigerator, AC, Air Coolers, Audio
          Devices(Headphones/Speakers), Gas Stoves, Electric Stoves Etc..,
          Choose from a wide range of options in every category, exclusively
          handpicked to help you find the best quality available at the lowest
          prices. We will Deliver with In 24 hours. In case of any queries or
          further details feel free to write to Us on support@alphasilver.in
        </p>
      </div>
    </>
  );
}

export default AboutShoppy;
