import React from 'react'
import { useParams } from 'react-router-dom'
import CardContainer from './CardContainer';
import Loading from './Loading';
import { useApiGet } from '../hook/useApiGet';

export default function Search() {

    const { productName } = useParams();
    const { data, loading, error } = useApiGet(`products/search/${productName}`)

    return (
        <>
            {
                loading && !error ? <Loading /> :
                    (
                        error ?
                            <div className="d-flex align-items-center justify-content-center vh-100-nav text-light">
                                <div className="text-center">
                                    <h1 className="display-1 fw-bold">404</h1>
                                    <p className="fs-3"> <span className="text-danger">Opps!</span> Product not found.</p>
                                    <p className="lead">
                                        The product you're looking for doesn't exist.
                                    </p>
                                </div>
                            </div>
                            :
                            <div className='d-flex flex-wrap padding-1 p-5 gap-4 align-items-center justify-content-center  vh-100-nav'>
                                {
                                    data.map((item) => {
                                        return <CardContainer item={item} key={item.productID} />
                                    })
                                }
                            </div>
                    )
            }
        </>
    )
}
