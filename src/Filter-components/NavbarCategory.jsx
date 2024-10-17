import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
function NavbarCategory() {
  const location = useLocation();
  const categories = location.state;

  const navigate = useNavigate();
  const filteredCategory = location.state;
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .post("https://alpha-shoppy.vercel.app/api/get_products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function ProductClick(e) {
    const FilterCategory = products.filter(
      (filteritem) => filteritem.category_id == e.target.id
    );
    if (FilterCategory.length !== 0) {
      localStorage.setItem("filteredCategory", JSON.stringify(FilterCategory));
      navigate(`/FilterProductShoppy/${filteredCategory.name}`, {
        state: FilterCategory,
      });
    }
  }

  return (
    <div>
      <>
        <div className="grid justify-center md:flex md:justify-between bg-[#14949d59] px-3 p-5">
          <span className="text-2xl font-semibold text-center">
            {categories.name}
          </span>
          <div className="">
            <Link to="/">
              <span
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                Home
              </span>
            </Link>{" "}
            /
            <Link
              to="/AllCategoriesShoppy"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              <span> Category</span>
            </Link>
            <span className="ps-2 text-gray-400">/ Products</span>
          </div>
        </div>
        <div className="border border-gray-200 rounded-md m-8 p-5">
          <p className="font-semibold text-2xl mt-10 m-auto text-center md:text-left">
            {categories.name} Category
          </p>
          <div className="flex flex-wrap justify-center md:justify-start items-center text-center gap-16 border border-gray-200 rounded-md p-5 my-5">
            {categories.children.map((categoryitem) => {
              return (
                <>
                  <div key={categoryitem.id} className="cursor-pointer">
                    <img
                      src={categoryitem.image}
                      alt={categoryitem.name}
                      className="w-32 h-32 rounded-full border-2 border-[#49A6A2]"
                      id={categoryitem.id}
                      onClick={ProductClick}
                    />
                    <p>{categoryitem.name}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </>
    </div>
  );
}

export default NavbarCategory;
