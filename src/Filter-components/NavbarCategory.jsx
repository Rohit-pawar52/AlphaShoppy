import React, {useState, useEffect} from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
function NavbarCategory() {
  const location = useLocation();
  const categories = location.state.data;
  console.log(categories)

  const navigate = useNavigate(); 
  const filteredCategory = location.state;
  const [categoriestosend, setCategories] = useState([]);

  useEffect(() => {
    axios.post("https://alpha-shoppy.vercel.app/api/get_categories").then(response=>{
      setCategories(response.data.data);
    }).catch(err=>{
      console.log(err)
    })
}, []);

  function ProductClick(e) {
    const FilterCategory = categoriestosend.filter(
      (filteritem) => filteritem.category_id == e.target.id
    );
    localStorage.setItem("filteredCategory", JSON.stringify(FilterCategory));
    navigate(`/FilterProductShoppy/${filteredCategory.name}`, {
      state: FilterCategory,
    });
  }



  return (
    <div>
      {Array.isArray(categories) ? (
        // Display all categories
        categories.map((category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <img src={category.image} alt="" />
            {/* Render the category items here */}
          </div>
        ))
      ) : (
        // Display a single category
        <div className="All-clothes-head">
        <div className="clothing-head flex justify-between px-3">
          <div className="left">
            <span className="h3">{categories.name}</span>
          </div>
          <div className="right">
          <Link to="/" style={{textDecoration:"none",color:"black"}}><span className="list-inline-item" onClick={()=>{window.scroll(0,0)}}>Home</span></Link> /
          <Link to="/AllCategoriesShoppy" style={{textDecoration:"none",color:"black"}} onClick={()=>{window.scroll(0,0)}}><span> Category</span></Link>
            <span className="ps-2" style={{ color: "grey", cursor: "pointer" }}>
              / {categories.name}
            </span>
          </div>
        </div>
        <div className="all-clothes-body mx-5 p-3">
          <h3 className="mt-4">{categories.name} Category</h3>
          <div className="all-clothes mt-4">
            {
            categories.children.map((categoryitem) => {
              return (
                <>
                <div key={categoryitem.id} className="all-clothes-slide px-5">
                  <img
                    src={categoryitem.image}
                    alt={categoryitem.name}
                    className="all-clothes-image"
                    id={categoryitem.id}
                    onClick={ProductClick}
                    />
                  <h3 className="all-clothes-name">{categoryitem.name}</h3>
                </div>
                </>
              )
            })
            }
          </div>
        </div>
      </div>

      )}
    </div>
  );
}

export default NavbarCategory;
