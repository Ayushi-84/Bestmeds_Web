import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Categories from './Administrator/Categories';
import DisplayAllCategories from './Administrator/DisplayAllCategories';
import SubCategories from './Administrator/Subcategories';
import Brand from './Administrator/Brand';
import DisplayAllBrands from './Administrator/DisplayAllBrands';
import DisplayAllSubCategories from "./Administrator/DisplayAllSubCategories"
import Products from "./Administrator/Products"
import AdminLogin from "./Administrator/AdminLogin"
import showProductList from './UserInterface/showProducts';
import AdminDashboard from "./Administrator/AdminDashboard"
import DisplayAllProducts from "./Administrator/DisplayAllProducts"
import ProductImages from "./Administrator/ProductImages"
import Header from "./UserInterface/Header"
import Home from "./UserInterface/Home"
import CartButton from "./UserInterface/CartButton"
import ProductList from "./UserInterface/ProductList"
import Productview from "./UserInterface/Productview"
import Showcart from "./UserInterface/Showcart"
import SignIn from "./UserInterface/SignIn"
import SignUp from "./UserInterface/SignUp"
import ShowCartReview from "./UserInterface/ShowCartReview"
import FinalCartReview from "./UserInterface/FinalCartReview"
import PaymentGateway from "./UserInterface/PaymentGateway"
import ProductSubList from './UserInterface/ProductSubList';


function App(props) {
  return (
    <div >
     <BrowserRouter>
     <Routes>
       <Route history={props.history} element={<Categories/>} path="/categories"/>
       <Route history={props.history} element={<DisplayAllCategories/>} path="/displayallcategories"/>
       <Route history={props.history} element={<SubCategories/>} path="/subcategories"/>
       <Route history={props.history} element={<DisplayAllSubCategories/>} path="/displayallsubcategories"/>
       <Route history={props.history} element={<DisplayAllBrands/>} path="/displayallbrands"/>
       <Route history={props.history} element={<Brand/>} path="/brand"/>
       <Route history={props.history} element={<Products/>} path="/products"/>
       <Route history={props.history} element={<AdminLogin/>} path="/adminlogin"/>
       <Route history={props.history} element={<AdminDashboard/>} path="/admindashboard"/>
       <Route history={props.history} element={<DisplayAllProducts/>} path="/displayallproducts"/>
       <Route history={props.history} element={<ProductImages/>} path="/productimages"/>
       <Route history={props.history} element={<Header/>} path="/header"/>
       <Route history={props.history} element={<Home/>} path="/"/>
       <Route history={props.history} element={<CartButton/>} path="/cartbutton"/>
       <Route history={props.history} element={<ProductList/>} path="/productlist"/>
       <Route history={props.history} element={<Productview/>} path="/productview"/>
       <Route history={props.history} element={<ProductSubList/>} path="/productsublist"/>
       <Route history={props.history} element={<Showcart/>} path="/Showcart"/>
       <Route history={props.history} element={<SignIn/>} path="/signin"/>
       <Route history={props.history} element={<SignUp/>} path="/signup"/>
       <Route history={props.history} element={<SignUp/>} path="/signup"/>
       <Route history={props.history} element={<ShowCartReview/>} path="/showcartreview"/>
       <Route history={props.history} element={<FinalCartReview/>} path="/finalcartreview"/>
       <Route history={props.history} element={<PaymentGateway/>} path="/paymentgateway"/>
       {/* <Route history={props.history} element={<showProductList/>} path="/showProduct"/> */}
     </Routes>

     </BrowserRouter>

    </div>
  );
}

export default App;
