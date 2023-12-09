import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserConext';
import cart from '../assets/cart.svg'
import '../styles/productInfo.css'
import { Rating } from '@smastrom/react-rating';
import { useApiGet } from '../hook/useApiGet';
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';

export default function ProductInfo() {

  const { productID } = useParams();
  const { addToCart } = useContext(UserContext);
  const { data, loading, error } = useApiGet(`products/${productID}`)
  const handleAddToCart = () => {
    addToCart(data[0]);
  }
  // console.log(data)
  // reviews: [

  //   { stars: null, review: null, userName: null }

  // ]

  return (
    <>
      {
        loading && !error ? <Loading /> :
          (error ? <SomethingWentWrong /> :
            <div className='  padding-1 p-sm-5 max-width vh-100-nav'>
              <div className='d-flex image-and-info gap-5 text-light'>
                <div className='image-container-product-info'>
                  <img className='productinfo-img-width rounded' src={data[0]?.image} alt={data[0]?.productName} />
                </div>
                <div className='d-flex gap-2 flex-wrap flex-column text-light'>
                  <h3 className=''>{data[0]?.productName}</h3>
                  <h2 className=''>&#8377;{
                    data[0].price ?
                      data[0]?.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                      "..."
                  }</h2>
                  <div>
                    <h5 className=''>Description :</h5>
                    <p className=''>{data[0]?.description}</p>
                  </div>
                  <div>
                    <h5>Rating :</h5>
                    <Rating
                      style={{ maxWidth: 150 }}
                      value={data[0].reviews.map((item) => parseInt(item.stars)).reduce((curr,acc)=>acc+curr)/data[0].reviews.length}
                      readOnly={true}
                    />

                  </div>
                  <button
                    onClick={handleAddToCart}
                    className='btn btn-outline-success productinfo-img-width align-self-center mt-5 gap-2 d-flex text-light justify-content-center align-items-center'>
                    <img src={cart} alt="cart" width={"40px"} />
                    <p className='mb-0'>Add to cart</p>
                  </button>
                </div>
              </div>
              <div className='mt-5 text-light d-flex flex-column gap-2'>
                <h4>Reviews : {data[0].reviews[0].review !== null ? data[0].reviews.length : 0}</h4>
                {
                 data[0].reviews[0].review !== null && data[0].reviews.map((item, index) => {
                    if (item.review === null) return <></>
                    return <div
                      key={index}
                      className='text-decoration-none text-light'>
                      <div
                        className='d-flex p-3 gap-3 order rounded text-decoration-none flex-column'>
                        <div className='d-flex justify-content-between w-100'>
                          <h6
                            className="pt-3">
                            {item.userName.charAt(0).toUpperCase() + item.userName.slice(1)}
                          </h6>
                          <Rating
                            style={{ maxWidth: 50 }}
                            readOnly={true}
                            value={item.stars}
                          />
                        </div>
                        <h6 className='text-secondary'>{item.review}</h6>
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
          )
      }
    </>
  )
}
