import React, {  useState, useEffect, useRef } from 'react'
import './AllCategoriesShoppy.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllCategoriesShoppy() {
    const [categories, setCategories] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://alphasilver.productsalphawizz.com/app/v1/api/get_categories');
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
     <div className="h2 text-center my-5 border-b-2 border-grey-500 pb-3">
        Category
    </div>
     <div className="flex flex-wrap justify-around gap-16 ">
{categories.map((category) => (
   
        <div key={category.id} className="text-center">
          <img src={category.image} id={category.id} alt={category.name} className="category-image" onClick={CategoryClick}/>
          <h3 className="category-name1 text-sm">{category.name}</h3>
          </div>
      ))}
      </div>
    </>
  )
}

export default AllCategoriesShoppy