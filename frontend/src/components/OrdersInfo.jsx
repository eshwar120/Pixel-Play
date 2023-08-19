import React, { useState } from 'react'
import { useApiGet } from '../hook/useApiGet';
import '../styles/orders.css'
import { Link } from 'react-router-dom';

export default function OrdersInfo() {

  const [ordersData] = useApiGet('orders');
  // console.log(ordersData)
  console.log(ordersData)

  return (
    <div
      className='vh-100-nav p-lg-5 text-light p-sm-3 p-2'>
      <h3
        className='text-center'>
        Your Orders
      </h3>
      <div
        className='orders-container d-flex flex-column gap-2'>
        {
          ordersData.map((item, index) => {
            return (
              <Link 
              to={`/orders/${item.orderID}`}
              className='text-decoration-none text-light'>
                <div
                  key={index}
                  className='d-flex p-2 gap-5 order rounded text-decoration-none'>
                  <img
                    className='rounded'
                    width={"100px"}
                    height={"150px"}
                    src={item.image}
                    alt={item.productName} />
                  <h6
                    className="pt-3">
                    {item.productName}
                  </h6>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}
