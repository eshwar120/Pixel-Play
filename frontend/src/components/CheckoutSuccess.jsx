import React from 'react'
import '../styles/checkout.css'
import { Link } from 'react-router-dom'

export default function CheckoutSuccess() {
    return (
        <div className='vh-100-nav d-flex flex-column justify-content-center align-items-center gap-1 text-light'>
            <div className="success-animation mb-2">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
            </div>
            <p className="fs-3 text-center"> <span className="text-success">Yay!</span> Order placed successfully.</p>
            <p className="lead text-center">
                It might take a few minutes to process your order
            </p>
            <Link to={"/"} className="btn btn-primary">Go Home</Link>
        </div>
    )
}
