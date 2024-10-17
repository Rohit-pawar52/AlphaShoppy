import React, {  useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllCategoriesShoppy() {
    const [categories, setCategories] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://alpha-shoppy.vercel.app/api/get_categories");
        setCategories(response.data.data); 
        setLoading(false);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  function CategoryClick(e){
    const FilterCategory = categories.find((filteritem)=>{return filteritem.id == e.target.id});
    navigate(`/NavbarCategory/${FilterCategory.name}`,{state:FilterCategory});
  }

  return (
    <>
    <center className="text-3xl font-bold mt-10 border-b pb-5">
      Category
    </center>
    <div className="flex flex-wrap justify-evenly items-center  gap-16 m-16">
      {categories.map((category) => (
        <div
          key={category.id}
          className="grid justify-center gap-2 w-32 h-32 m-3"
        >
          <img
            src={category.image}
            onClick={CategoryClick}
            id={category.id}
            className="w-32 h-32 rounded-full border-2 border-[#49A6A2]"
          />
          <p className="text-center text-wrap">{category.name}</p>
        </div>
      ))}
    </div>
  </>
  )
}

export default AllCategoriesShoppy