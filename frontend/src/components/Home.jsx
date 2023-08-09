import React, { useContext, useEffect, useState } from 'react'
import "../index.css"
import CarouselContainer from './CarouselContainer'
import { UserContext } from '../context/UserConext';
import axios from 'axios';
import CardContainer from './CardContainer';

export default function Home() {

  const [productData, setProductData] = useState([]);
  const { SERVER_ADDRESS } = useContext(UserContext);
  useEffect(() => {
    // console.log(true)
    axios.get(`${SERVER_ADDRESS}products`)
      .then(response => {
        // console.log(response.data.productsData);
        setProductData(response.data.productsData)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])


  // console.log(productData)


  return (
    <div className='d-flex flex-column align-items-center p-lg-5 p-sm-3 p-2 vh-100-nav'>
      <CarouselContainer />
      <div className='d-flex flex-wrap p-lg-2 p-sm-1 p-1 gap-lg-4 gap-sm-3 gap-2 align-items-center justify-content-center'>
        {
          productData.map((item) => {
            return <CardContainer item={item} key={item.productID} />
          })
        }
      </div>
    </div>
  )
}
