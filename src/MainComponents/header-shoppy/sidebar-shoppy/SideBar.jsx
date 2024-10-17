import React from 'react';
import {Link} from 'react-router-dom';
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
    { Icon: FaBoxOpen, name: "Products", target: "/"},
    { Icon: CgProfile, name: "My Account", target: "/" },
    { Icon: FaHistory, name: "My Orders", target: "/" },
    { Icon: CiHeart, name: "Favorite", target: "/" },
    { Icon: FaSignInAlt, name: "Login", target: "/" },
    { Icon: FaUserCheck, name: "Register", target: "/" },
    { Icon: FaInfo, name: "About Us", target: "/AboutShoppy" },
    { Icon: FaEnvelope, name: "Contact Us", target: "/ContactShoppy" },
  ];
  
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        {menuItems.map((item, index) => {
          const Icon = item.Icon; 
          return (
            <div key={index} className="menu-item flex items-center gap-3" onClick={toggleSidebar}>
              <Link to={item.target}>
              <Icon /> {item.name}
              </Link>
            </div>
          );
        })}
      </div>

      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar} aria-hidden={!isOpen}></div>
    </>
  );
};

export default SideBar;
