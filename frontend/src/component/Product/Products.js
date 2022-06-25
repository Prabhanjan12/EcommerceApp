import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productActions';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider'
import { Typography } from '@material-ui/core';
import Metadata from '../layout/MetaData'

const categories=[
  "Laptop",
  "Car",
  "speaker",
  "Shirt",
  "Footwear",
  "Bags"
]

const Products = () => {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0,2500000]);

  const [category, setCategory] = useState("")

  const {
     products,
     loading,
     productsCount, 
     error, 
     resultPerPage, 
     filteredProductsCount 
    } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler=(event,newPrice)=>{
    setPrice(newPrice);
  }

  useEffect(() => {

    dispatch(getProducts(currentPage,price,category));
  }, [dispatch, currentPage,price,category]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      <Metadata title="PRODUCTS -- ECOMMERCE"/>
      <h2 className='productsHeading'>Products</h2>
      <div className='products'>
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>

            <div className='filterBox'>
              <Typography>Price</Typography>
              <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={2500000}
              />

              <Typography>Categories</Typography>
              <ul className='categoryBox'>
                {categories.map((category)=>(
                  <li className='category-link'
                  key={category}
                  onClick={()=>setCategory(category)}>{category}</li>
                ))}
              </ul>
            </div>
      {resultPerPage < count && (
        <div className='paginationBox'>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            FirstPageText="1st"
            LastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass='pageItemActive'
            activeLinkClass='pageLinkActive'
          />


        </div>
      )}
    </Fragment>
  )
}

export default Products