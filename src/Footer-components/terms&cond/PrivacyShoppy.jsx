import React from 'react'
import { Link } from 'react-router-dom'
function PrivacyShoppy() {
  return (
    <div>
         <div className="Seller-Shoppy-head flex justify-between px-3">
          <div className="left">
            <span className="h3">Privacy Policy</span>
          </div>
          <div className="right">
          <Link to="/" style={{textDecoration:"none",color:"black"}}><span className="pe-2">Home</span></Link> /
            <span className="ps-2" style={{ color: "grey", cursor: "pointer" }}>
            Privacy Policy
            </span>
          </div>
        </div>
        <div className="baby-carebody my-5 text-justify p-4">
          <center className="h2">Privacy Policy</center>
          <p>
          Privacy policy<br></br>
Alpha Silver is Multi-vendor Application from which user can purchase the products of Ecommerce according to their requirement 
          </p>
        </div>
    </div>
  )
}

export default PrivacyShoppy