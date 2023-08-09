import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserConext';
import cart from '../assets/cart.svg'
import '../styles/productInfo.css'
import { Rating } from '@smastrom/react-rating';

export default function ProductInfo() {

  const { productID } = useParams();
  const { SERVER_ADDRESS, addToCart } = useContext(UserContext);
  const [productData, setProductData] = useState({

  });
  const handleAddToCart = () => {
    addToCart(productData);
  }

  useEffect(() => {
    axios.get(`${SERVER_ADDRESS}products/${productID}`)
      .then(response => {
        // console.log(response.data.productData[0])
        setProductData(response.data.productData[0])
      })
      .catch(err => console.log(err.message))
  }, [])

  return (
    <div className='  padding-1 p-sm-5'>
      <div className='d-flex image-and-info gap-5 text-light'>
        <div className='image-container-product-info'>
          <img className='productinfo-img-width rounded' src={productData.image} alt={productData.productName} />
        </div>
        <div className='d-flex gap-2 flex-wrap flex-column text-light'>
          <h3 className='display-4'>{productData.productName}</h3>
          <h2>&#8377;{
            productData.price ?
              productData.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
              "..."
          }</h2>
          <div>
            <h4 className=''>Description :</h4>
            <p className='lead'>{productData.description}</p>
          </div>
          <div>
            <h4>Rating :</h4>
            <Rating
              style={{ maxWidth: 150 }}
              value={4.3}
              readOnly={true}
            />
          </div>
          <button
            onClick={handleAddToCart}
            className='btn btn-outline-success productinfo-img-width align-self-center mt-5 gap-2 d-flex text-light justify-content-center align-items-center'>
            <img src={cart} alt="cart" width={"40px"} />
            <p className='mb-0'>Add to cart</p>
          </button>
        </div>
      </div>
      <div className='mt-5 text-light'>
        <h4>Reviews :</h4>

      </div>
    </div>
  )
}
