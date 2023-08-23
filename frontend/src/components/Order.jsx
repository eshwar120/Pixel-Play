import React from 'react'
import { useApiGet } from '../hook/useApiGet'
import { useParams } from 'react-router-dom'
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';

export default function Order() {

  const { orderID } = useParams();
  console.log(orderID)
  const {data, loading, error} = useApiGet(`orders/${orderID}`)
  console.log(data)
  return (
    <>
    {
      loading && !error ? <Loading /> : (
        error ? <SomethingWentWrong /> :
          <div></div>)
    }
    </>
  )
}
