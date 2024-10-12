import React from "react";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { FaTruckFast } from "react-icons/fa6";
import { ImHistory } from "react-icons/im";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
function BodyFooter() {
  
  return (
    <>
      <div>
        <div className="md:flex md:justify-evenly md:items-center border-2 border-gray-100 m-5 p-4 rounded-md">
          <div className="grid justify-center">
            <img
              src="images/body-footer-img/phone.png"
              alt=""
              className="h-16"
            />
          </div>
          <div>
            <p className="text-justify font-bold mx-5 text-4xl">
              Download App Now !
            </p>
            <p className="mx-5 text-justify mt-3">
              Use code <span className="font-bold">WELCOMEMMT</span> and get{" "}
              <span className="font-bold">FLAT 12% OFF*</span> on your first
              domestic flight booking
            </p>
          </div>
          <div className="flex gap-10 items-center p-4 md:p-auto">
            <div className="md:grid md:gap-2">
              <div className="flex bg-black text-white rounded-md p-1">
                <FaApple className="text-3xl" />
                <div>
                  <p className="text-xs mb-[-0px]">Download on the </p>
                  <h5 className="leading-3">App Store</h5>
                </div>
              </div>
              <div className="flex bg-black text-white rounded-md p-1 mt-3">
                <FaGooglePlay className="text-3xl" />
                <div>
                  <p className="text-xs mb-[-0px]">Get it on</p>
                  <h5 className="leading-3">Google Play</h5>
                </div>
              </div>
            </div>
            <div className="body-footer-box-code">
              <img
                src="images/body-footer-img/QR-code.jpg"
                alt=""
                style={{ width: "105px" }}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-5 ps-14 bg-[#49A6A2] md:flex md:justify-between items-center p-7 text-white md:text-center">
          <div className="flex gap-10 md:gap-7 items-center">
              <FaTruckFast className="w-16 h-16" />
              <div>
              <p className="text-xl font-bold">Fast Shipping</p>
              <p>
                Fast Shipping at your<br></br> door step.
              </p>
              </div>
          </div>
          <div className="flex gap-10 md:gap-7 items-center">
              <ImHistory className="w-16 h-16" />
              <div>
              <p className="text-xl font-bold">Free Returns</p>
              <p>
                Free return if products<br></br> are damaged.
              </p>
              </div>
          </div>
          <div className="flex gap-10 md:gap-7 items-center">
              <MdOutlineWifiCalling3 className="w-16 h-16" />
              <div>
              <p className="text-xl font-bold">Support 24/7</p>
              <p>
                24/7 and 365 days<br></br> support is available.
              </p>
              </div>
          </div>
          <div className="flex gap-10 md:gap-7 items-center">
              <GoArrowRight className="w-16 h-16" />
              <p className="text-2xl font-semibold">Seller Login</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BodyFooter;
