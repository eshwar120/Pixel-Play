import React, { useContext, useState } from 'react'
import cart from '../assets/cart.svg'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserConext'




export default function CardContainer({item}) {

  const { addToCart } = useContext(UserContext);

  const handleAddToCart = () => {
      addToCart(item);
  }

  return (
    <div className='d-flex flex-column card-width bg-dark text-light rounded gap-1 p-2 overflow-hidden product-card object-fit-fill'>
      <Link to={`/product/${item.productID}`}>
      <img 
      src={item.image} 
      alt={item.productName} 
      className='rounded card-image'/>
      </Link>
      <h6 className='text-center mb-0 font-weight-bold text-truncate'>{item.productName}</h6>
      <p className='text-center mb-0'>&#8377;{item.price}</p>
      <button 
      onClick={handleAddToCart}
      className='btn btn-outline-success gap-2 d-flex text-light justify-content-center align-items-center'>
        <img src={cart} alt="cart" width={"25px"}/>
        <p className='mb-0 hide-at-576px'>Add to cart</p>
      </button>
    </div>
  )
}
