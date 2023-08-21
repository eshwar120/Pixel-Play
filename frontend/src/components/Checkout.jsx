import React, { useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserConext'
import cart from '../assets/cart.svg'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {

    const { token, userData, cartData, updateLoginStatus } = useContext(UserContext)
    const navigate = useNavigate();
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };

    const handleChekout = () => {
        axios.post(`${import.meta.env.VITE_SERVER_URL}neworder`, cartData, config )
            .then(res => {
                // console.log(res);
                window.location.href= res.data.url;
            })
            .catch(err => {
                console.log(err.response);
                if(err.response.data.logOut === true) {
                    console.log(true)
                    updateLoginStatus(true) 
                    navigate('/signin')
                }
            })
    }

    console.log(import.meta.env.VITE_SERVER_URL)

    return (
        <button
            onClick={handleChekout}
            className='btn btn-outline-success font-bold p-3 gap-2 d-flex text-light justify-content-center align-items-center fs-5 '
        >
            <img src={cart} alt="cart" width={"30px"} />
            Check out
        </button>
    )
}


// import { useContext, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { UserContext } from '../context/UserConext';
// import cart from '../assets/cart.svg'

// const stripePromise = loadStripe(import.meta.env.VITE_PUBLISH_KEY);

// export default function Checkout() {
//     const [paymentError, setPaymentError] = useState(null);
//     const { token, userData, cartData, updateLoginStatus } = useContext(UserContext)

//     const handlePayment = async () => {
//         try {
//             const stripe = await stripePromise;

//             // Create PaymentIntent on your server
//             const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders/neworder`, {
//                 method: 'POST',
//                 headers: {
//                     authorization: `Bearer ${token}`
//                 },
//                 body: {
//                     cartData
//                 }
//             });

//             const data = await response.json();

//             // Redirect to Stripe payment page
//             const { error } = await stripe.redirectToCheckout({
//                 sessionId: data.clientSecret,
//             });

//             if (error) {
//                 setPaymentError(error.message);
//             }
//         } catch (error) {
//             console.error(error);
//             setPaymentError('An error occurred during payment');
//         }
//     };

//     return (
//         <div>
//             {/* Payment form fields */}
//             <button
//                 onClick={handlePayment}
//                 className='btn btn-outline-success font-bold p-3 gap-2 d-flex text-light justify-content-center align-items-center fs-5 '
//             >
//                 <img src={cart} alt="cart" width={"30px"} />
//                 Check out
//             </button>
//             {paymentError && <p>{paymentError}</p>}
//         </div>
//     );
// };

// ... render PaymentForm and other components ...
