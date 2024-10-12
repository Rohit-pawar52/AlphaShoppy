import React from 'react';
import './SideBar.css';
import { FaBoxOpen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaSignInAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { Icon: FaBoxOpen, name: "Products" },
    { Icon: CgProfile, name: "My Account" },
    { Icon: FaHistory, name: "My Orders" },
    { Icon: CiHeart, name: "Favorite" },
    { Icon: FaSignInAlt, name: "Login" },
    { Icon: FaUserCheck, name: "Register" },
    { Icon: FaInfo, name: "About Us" },
    { Icon: FaEnvelope, name: "Contact Us" },
  ];
  
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        {menuItems.map((item, index) => {
          const Icon = item.Icon; // Get the Icon from the item
          return (
            <div key={index} className="menu-item flex items-center gap-3" onClick={toggleSidebar}>
              <Icon /> 
              {item.name}
            </div>
          );
        })}
      </div>

      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar} aria-hidden={!isOpen}></div>
    </>
  );
};

export default SideBar;
