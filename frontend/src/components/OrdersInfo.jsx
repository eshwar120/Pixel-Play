import React, { useState } from 'react'
import { useApiGet } from '../hook/useApiGet';

export default function OrdersInfo() {

  const [ordersData]  = useApiGet('orders');
  // console.log(ordersData)

  return (
    <div>
      
    </div>
  )
}
