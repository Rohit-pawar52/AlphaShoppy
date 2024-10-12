import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate } from "react-router-dom";
import "./NavbarCategory.css";
import axios from 'axios';

function NavbarCategory() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const filteredCategory = location.state;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.post(
      "https://alphasilver.productsalphawizz.com/app/v1/api/get_products"
    ).then(response=>{
      setCategories(response.data.data);
    }).catch(err=>{
      console.log(err)
    })
}, []);

  function ProductClick(e) {
    const FilterCategory = categories.filter(
      (filteritem) => filteritem.category_id == e.target.id
    );
    localStorage.setItem("filteredCategory", JSON.stringify(FilterCategory));
    navigate(`/FilterProductShoppy/${filteredCategory.name}`, {
      state: FilterCategory,
    });
  }

  return (
    <>
      <div className="All-clothes-head">
        <div className="clothing-head flex justify-between px-3">
          <div className="left">
            <span className="h3">{filteredCategory.name}</span>
          </div>
          <div className="right">
          <Link to="/" style={{textDecoration:"none",color:"black"}}><span className="list-inline-item" onClick={()=>{window.scroll(0,0)}}>Home</span></Link> /
          <Link to="/AllCategoriesShoppy" style={{textDecoration:"none",color:"black"}} onClick={()=>{window.scroll(0,0)}}><span> Category</span></Link>
            <span className="ps-2" style={{ color: "grey", cursor: "pointer" }}>
              / {filteredCategory.name}
            </span>
          </div>
        </div>
        <div className="all-clothes-body mx-5 p-3">
          <h3 className="mt-4">{filteredCategory.name} Category</h3>
          <div className="all-clothes mt-4">
            {
            filteredCategory.children.map((categoryitem) => {
              return (
                <>
                <div key={categoryitem.id} className="all-clothes-slide px-5">
                  <img
                    src={categoryitem.image}
                    alt={categoryitem.name}
                    className="all-clothes-image"
                    id={categoryitem.id}
                    onClick={ProductClick}/>
                  <h3 className="all-clothes-name">{categoryitem.name}</h3>
                </div>
                </>
              )
            })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarCategory;
