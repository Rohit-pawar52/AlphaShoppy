import React from "react";
import { Link } from "react-router-dom";
import { TbBrandFacebook } from "react-icons/tb";
import { SlSocialTwitter } from "react-icons/sl";
import { BsInstagram } from "react-icons/bs";
import { SlSocialYoutube } from "react-icons/sl";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";

const FooterShoppy = () => {
  return (
    <>
      <div className="pt-10 bg-[#1f2237] text-white">
        <div className="grid gap-5 ps-5 justify-start md:flex md:justify-around">
            <img
              className="h-24"
              src="images/alpha-shoppy-logo/alphashoppy.png"
            />

          <div>
            <p className="text-2xl pb-3 font-bold">Get to Know Us</p>
            <p className="border-b-2 border-[#49A6A2] mr-44"></p>
            <div className="flex gap-20 leading-8">
              <div>
                <p>
                  <Link
                    to="/"
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Home
                  </Link>
                </p>
                <p>
                  <Link
                    to="/ProductShoppy"
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Products
                  </Link>
                </p>
                <p
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  Register
                </p>
                <p>
                  <Link
                    to="/ContactShoppy"
                    style={{ textDecoration: "none", color: "white" }}
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Contact Us
                  </Link>
                </p>
              </div>
              <div className="ps-5">
                <Link
                  to="/AllCategoriesShoppy"
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  Category
                </Link>
                <p
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  Login
                </p>
                <p>
                  <Link
                    to="/AboutShoppy"
                    style={{ textDecoration: "none", color: "white" }}
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    About Us
                  </Link>
                </p>
                <p>
                  <Link
                    to="/SellerShoppy"
                    style={{ textDecoration: "none", color: "white" }}
                    onClick={() => {
                      window.scroll(0, 0);
                    }}
                  >
                    Sellers
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <p className="font-bold text-2xl">Connect with Us</p>
            <div className="flex justify-evenly gap-5">
              <TbBrandFacebook
                size={50}
                className="bg-[#3b5998] rounded-full p-3"
              />
              <SlSocialTwitter
                size={50}
                className="bg-[#1DA1F2] rounded-full p-3"
              />
              <BsInstagram
                size={50}
                className="bg-[#C13584] rounded-full p-3"
              />
              <SlSocialYoutube
                size={50}
                className="bg-[#FF0000] rounded-full p-3"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex bg-white text-black rounded-md p-1">
                <FaApple className="text-3xl" />
                <div>
                  <p className="text-xs mb-[-0px]">Download on the </p>
                  <h5 className="leading-3">App Store</h5>
                </div>
              </div>
              <div className="flex bg-white text-black rounded-md p-1">
                <FaGooglePlay className="text-3xl" />
                <div>
                  <p className="text-xs mb-[-0px]">Get it on</p>
                  <h5 className="leading-3">Google Play</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-3" />

        <div className="flex justify-between p-5">
          <p className="text-center">
            Copyright © 2024, All Rights Reserved Alpha Platinum Private Limited
          </p>
          <div className="hidden md:flex gap-5">
            <Link
              to="/"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              Home
            </Link>
            <Link
              to="/TermsShoppy"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              Terms & Conditions
            </Link>
            <Link
              to="/PrivacyShoppy"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/AboutShoppy"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              About Us
            </Link>
            <Link
              to="/ContactShoppy"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterShoppy;
