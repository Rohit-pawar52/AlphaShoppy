import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './MainComponents/HomePage/HomePage';
import HeaderShoppy from './MainComponents/header-shoppy/HeaderShoppy';
import FooterShoppy from './Footer-components/Footer-shoppy/FooterShoppy';
import ProductShoppy from './MainComponents/product-shoppy/ProductShoppy';
import AboutShoppy from './Footer-components/About-shoppy/AboutShoppy';
import ContactShoppy from './Footer-components/contact-shoppy/ContactShoppy';
import SellerShoppy from './Footer-components/seller-shoppy/SellerShoppy';
import NavbarCategory from './Filter-components/NavbarCategory';
import TermsShoppy from './Footer-components/terms&cond/TermsShoppy';
import PrivacyShoppy from './Footer-components/terms&cond/PrivacyShoppy';
import FilterProductShoppy from './MainComponents/product-shoppy/FilterProductShoppy';
import ProductIndividualShoppy from './Filter-components/ProductIndividualShoppy/ProductIndividualShoppy';
import ProductDescription from './MainComponents/product-shoppy/ProductDescription';
const App = () => {
  return (
    <>
    <Router>
      <HeaderShoppy/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='NavbarCategory/:ProductName' element={ <NavbarCategory/>}/>
        <Route path='/ProductShoppy' element={<  ProductShoppy/>} />
        <Route path='/AboutShoppy' element={<  AboutShoppy/>} />
        <Route path='/ContactShoppy' element={<  ContactShoppy/>} />
        <Route path='/SellerShoppy' element={<  SellerShoppy/>} />
        <Route path='/NavbarCategory' element={<  NavbarCategory/>} />
        <Route path='/TermsShoppy' element={<  TermsShoppy/>} />
        <Route path='/PrivacyShoppy' element={<   PrivacyShoppy/>} />
        <Route path='/FilterProductShoppy/:ProductName' element={<   FilterProductShoppy/>} />
        <Route path='/ProductIndividualShoppy/:ProductName' element={<   ProductIndividualShoppy/>} />
        <Route path='/ProductDescription/:ProductName' element={<   ProductDescription/>} />
       
      </Routes>
      <FooterShoppy/>
    </Router>
    </>
  );
};

export default App;
