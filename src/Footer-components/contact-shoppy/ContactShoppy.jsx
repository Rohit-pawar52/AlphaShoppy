import React from "react";
import { Link } from "react-router-dom";
import "./ContactShoppy.css";

function ContactShoppy() {
  return (
    <div className="contact-shoppy">
      <div className="contact-shoppy-head flex justify-between px-3">
        <div className="left">
          <span className="h3">Contact Us</span>
        </div>
        <div className="right">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <span className="pe-2">Home</span>
          </Link>{" "}
          /
          <span className="ps-2" style={{ color: "grey", cursor: "pointer" }}>
            Contact Us
          </span>
        </div>
      </div>
      <div className="flex justify-evenly item-center">
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.3350465142894!2d75.89112842349716!3d22.75294407633981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302af403406fb%3A0x5b50834b117f8bab!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1727267103692!5m2!1sen!2sin"
            width="700"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-shoppy-form py-3">
          <p className="h1">Contact Us</p>
          <form>
            <div className="form-group">
              <label>
                Register as*: 
                <input type="radio" name="role" value="vendor" /> Vendor
                <input type="radio" name="role" value="customer" /> Customer
              </label>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Username</label>
                <input type="text" placeholder="Your Name" name="username" />
              </div>
              <div className="form-field">
              <label>Email
                <input type="email" placeholder="Your Email" name="email" />
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Number
                <input type="text" placeholder="Your Number" name="number" />
                </label>
              </div>
              <div className="form-field">
                <label>City
                <input type="text" placeholder="Your City" name="city" />
                </label>
              </div>
            </div>
            <div className="form-field">
                <label>Message
              <textarea placeholder="Message" name="message" style={{width:"480x", height:"100px"}}></textarea>
              </label>
            </div>
            <button type="submit-contact">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactShoppy;
