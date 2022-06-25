import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import MetaData from '../layout/MetaData'
import "./Home.css"
import Product from "./ProductCard.js"
import { getProducts } from '../../actions/productActions'
import { useSelector,useDispatch } from 'react-redux'

const product={
  name:"Mobile",
  images:"",
  price:""
}

const Home = () => {

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch]);
  
  const { loading, error, products, productsCount }=useSelector(
    (state)=>state.products);

  return ( <Fragment>
    
          <MetaData title="ECOMMERCE"/>
        <div className='banner'>
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Products Below</h1>

        <a href='#container'>
            <button>
                Scroll <CgMouse/>
            </button>
        </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className="container" id="container">
        {products && products.map((product)=> <Product product={product}/>)}
            
        </div>
        </Fragment>
  
  )}

export default Home