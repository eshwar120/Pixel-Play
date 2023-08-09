import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserConext'
import shoppingCart from '../assets/cart.gif'
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import cart from '../assets/cart.svg'

export default function Cart() {

  const { cartData } = useContext(UserContext);
  // console.log(cartData)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (cartData.length) {
      let sum = 0;
      for (let item of cartData) {
        sum += Number(item.price)
      }
      setTotal(sum)
    }
    return () => { setTotal(0) }
  })
  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100-nav '>
      {
        cartData.length === 0 ?
          <>
            <div className="d-flex align-items-center justify-content-center vh-100-nav text-light ">
              <div className="text-center">
                <img className='empty-cart-image ' src={"https://unloop.com/wp-content/uploads/2022/04/Cart.gif"} alt="shopping-cart" />
                <p className="fs-3"> <span className="text-danger">Opps!</span> Your cart is empty.</p>
                <p className="lead">
                  Visit home to add something.
                </p>
                <Link to={"/"} className="btn btn-primary">Go Home</Link>
              </div>
            </div>
          </>
          :
          <div className='d-flex gap-lg-4 gap-sm-3 gap-2 flex-column p-lg-5 p-sm-3 p-2'>
            {
              cartData.map((item, index) => {
                return (
                  <CartItem item={item} key={index + "item"} />
                )
              })
            }
            <div className='p-3 justify-content-between rounded bg-dark text-light d-flex align-items-center gap-lg-4 flex-wrap gap-sm-3 gap-2 sticky-bottom border border-1 align-middle'>
              <h4>Total</h4>
              <h4 className='mb-1 text-center'>&#8377;{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
            </div>
            <button
              className='btn btn-outline-success font-bold p-3 gap-2 d-flex text-light justify-content-center align-items-center fs-5 '
            >
              <img src={cart} alt="cart" width={"30px"} />
              Check out
            </button>
          </div>

      }
    </div>
  )
}
