import React from "react";
import { Link } from "react-router-dom";

function ContactShoppy() {
  return (
    <>
      <div className="grid justify-center md:flex md:justify-between bg-[#14949d59] px-3 p-5">
        <span className="text-2xl font-semibold text-center">Contact Us</span>
        <div>
          <Link
            to="/"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <span> Home</span>
          </Link>
          <span className="ps-2 text-gray-400">/ Contact Us</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 mx-5 my-12 md:m-12">
        <div className="h-96 md:px-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.3350465142894!2d75.89112842349716!3d22.75294407633981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302af403406fb%3A0x5b50834b117f8bab!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1727267103692!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full rounded-md"
          ></iframe>
        </div>
        <div className="border rounded-md md:px-5">
          <center className="text-3xl my-2">Contact Us</center>
          <form className="grid gap-2">
              <div className="text-xl flex gap-2 items-center">
                Register as*:
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  className="md:ms-5"
                />{" "}
                Vendor
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  className="md:ms-8"
                />{" "}
                Customer
              </div>
            <div className="grid grid-cols-2">
              <div className="w-1/2">
                <label>Username
                <input
                  type="text"
                  placeholder="Your Name"
                  name="username"
                  className="border-2 p-2 focus:outline-[#49A6A2] w-64"
                />
                </label>
              </div>
              <div className="w-1/2">
                <label>
                  Email
                  <input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    className="border-2 p-2 focus:outline-[#49A6A2] w-64"
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="w-1/2">
                <label>
                  Number
                  <input
                    type="text"
                    placeholder="Your Number"
                    name="number"
                    className="border-2 p-2 focus:outline-[#49A6A2] w-64"
                  />
                </label>
              </div>
              <div className="w-1/2">
                <label>
                  City
                  <input
                    type="text"
                    placeholder="Your City"
                    name="city"
                    className="border-2 p-2 focus:outline-[#49A6A2] w-64"
                  />
                </label>
              </div>
            </div>
            <div>
              <label>
                Message
                <textarea
                  placeholder="Message"
                  name="message"
                  className="border-2 p-2 focus:outline-[#49A6A2] w-[97%]"
                ></textarea>
              </label>
            </div>
            <button type="submit" className="border-2 p-2 bg-[#49A6A2] w-[97%]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactShoppy;
