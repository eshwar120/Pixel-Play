import React from 'react'
import { useApiGet } from '../hook/useApiGet'
import { useParams } from 'react-router-dom'

export default function Order() {

  const { orderID } = useParams();
  console.log(orderID)
  const [orderInfo] = useApiGet(`orders/${orderID}`)
  console.log(orderInfo)
  return (
    <div>

    </div>
  )
}
