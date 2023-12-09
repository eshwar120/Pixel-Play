import React from 'react'
import { useApiGet } from '../hook/useApiGet'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';
import tickSvg from '../assets/tick.svg'
import OrderReview from './OrderReview';

export default function Order() {

  const { orderID } = useParams();
  // console.log(orderID)
  const { data, loading, error } = useApiGet(`orders/${orderID}`);

  // console.log(data)
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <SomethingWentWrong />
  }
  return (
    <>
      <div className='padding-1 clr-white p-sm-5 max-width vh-100-nav d-flex flex-column flex-sm-row
 flex-wrap'>
        <div className='w-xs-100 w-sm--75 d-flex flex-column gap-2'>
          <h6 className='text-secondary'>Order ID - HJGADFE7GUFY34U{data[0].orderID}</h6>
          <h5 className='font-weight-bold'>{data[0].productName}</h5>
          <h5>&#8377;{data[0].price}</h5>
          <h6 className='d-flex align-items-center'><img src={tickSvg} alt="" className='h-50' />  Delivered On {data[0].orderTime}</h6>
          <OrderReview productID={data[0].productID} />
        </div>
        <div className='w-sm--25 w-xs-50 mx-auto'>
          {console.log(data[0].productID)}
          <Link to={`/product/${data[0].productID}`}>
            <img src={data[0].image} alt={data[0].productName} className='w-100 object-fit-contain rounded' />
          </Link>
        </div>
      </div>
    </>
  )
}
