import React, { useContext } from 'react'
import delIcon from '../assets/delete.svg'
import { UserContext } from '../context/UserConext'
import { Link } from 'react-router-dom'
import '../styles/cart.css'

export default function CartItem({ item }) {

    const { removeFromCart } = useContext(UserContext)

    return (
        <div className='d-flex gap-lg-4 flex-wrap gap-sm-3 gap-1 align-items-center text-light rounded cart-item p-3 cart-card-container min-height-155px'>
            <Link to={`/product/${item.productID}`}>
                <img className="w-100px rounded" src={item.image} alt={item.productName} />
            </Link>
            <p className='w-250px text-center lead mb-0'>{item.productName} </p>
            <h5>&#8377;{
                item.price ?
                item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                "..."
            }</h5>
            <button
                onClick={() => {
                    removeFromCart(item)
                }}
                className='btn btn-outline-danger gap-2 d-flex text-light justify-content-center align-items-center object-fit-fill'>
                <img src={delIcon} alt="Delete" width={"20px"} height={"25px"} />
            </button>
        </div>
    )
}
