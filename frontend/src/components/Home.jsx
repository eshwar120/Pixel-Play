import React from 'react'
import "../index.css"
import CarouselContainer from './CarouselContainer'
import CardContainer from './CardContainer';
import { useApiGet } from '../hook/useApiGet';
import Loading from './Loading';

export default function Home() {

  const { data, loading, error } = useApiGet(`products`);

  return (
    <>
      {
        loading && !error ? <Loading /> :
          (
            error ? <Error /> :
              <div className='d-flex flex-column align-items-center p-lg-5 p-sm-3 p-2 vh-100-nav max-width'>
                <CarouselContainer />
                <div className='d-flex flex-wrap p-lg-2 p-sm-1 p-1 gap-lg-4 gap-sm-3 gap-2 align-items-center justify-content-center'>
                  {
                    data.map((item) => {
                      return <CardContainer item={item} key={item.productID} />
                    })
                  }
                </div>
              </div>
          )

      }
    </>
  )
}
