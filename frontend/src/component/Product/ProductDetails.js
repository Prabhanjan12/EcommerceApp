import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../actions/productActions'
import './ProductDetails.css';
import Metadata from '../layout/MetaData';


const ProductDetails = () => {
    const dispatch = useDispatch();

    const { product, error, loading } = useSelector((state) => state.productDetails);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id]);

    return (
        <Fragment>
            <Metadata title={`${product.name} -- ECOMMERCE`}/>
            <div className='ProductDetails'>
                {loading === false &&
                    <div >
                        <div>
                            {
                                product.images.map((item, i) => (
                                    <img className='Image1'
                                        key={i}
                                        src={item.url}
                                    />
                                ))}

                        </div>
                        <div className='ProductDetails1'>
                            <h2>
                                {product.name}
                            </h2>
                            <p>Product #{product._id}</p>
                        </div>
                        <div className='ProductDetails2'>
                            <h1>{`Rs${product.price}`}</h1>
                            <div className='ProductDetails3'>
                                <div className='ProductDetails4'>
                                    <button>-</button>
                                    <input value="1" type="number" />
                                    <button>+</button>
                                </div>{" "}
                                <button>Add to Cart</button>
                            </div>
                            <p>Status:{" "}
                                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        <div className='ProductDetails5'>
                            Description :<p>{product.description}</p>
                        </div>

                    </div>}
            </div>
        </Fragment>
    )

}

export default ProductDetails