import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardContainer from './CardContainer';
import axios from 'axios';
import { UserContext } from '../context/UserConext';

export default function Search() {

    const { productName } = useParams();
    const [notFound, setNotFound] = useState(false);
    const [productData, setProductData] = useState([]);
    const { SERVER_ADDRESS } = useContext(UserContext);
    useEffect(() => {
        if (productName === "") return
        axios.get(`${SERVER_ADDRESS}products/search/${productName}`)
            .then(response => {
                // console.log(response);
                setProductData(response.data.productsData)
                setNotFound(false)
            })
            .catch(err => {
                // console.log(err.response.status);
                if (err.response.status === 404) setNotFound(true)
            })
    }, [productName])

    return (
        <>
            {
                notFound ?
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
                            productData.map((item) => {
                                return <CardContainer item={item} key={item.productID} />
                            })
                        }
                    </div>
            }
        </>
    )
}
