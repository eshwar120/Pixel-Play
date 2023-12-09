import React, { memo, useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserConext';
import { Rating } from '@smastrom/react-rating';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useApiGet } from '../hook/useApiGet';

function OrderReview({ productID }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitReview, setSubmitReview] = useState(false);
    const [error, setError] = useState(false);
    const { SERVER_ADDRESS, token, updateLoginStatus, userData } = useContext(UserContext);
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const { loading: reviewGetLoading, data: reviewGetData, error: reviewGetError } = useApiGet(`reviews/${userData.userID}/${productID}`,loading);
    // console.log(reviewGetData)
    // { stars: 5, review: '', productID: 10, userID: 2, reviewID: 1 }

    const handleSubmit = async () => {
        if(review.length > 250) return;
        const body = {
            stars: rating,
            review: review,
            productID: productID,
            userID: userData.userID
        };
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        setLoading(true);
        setError(false);
        axios
            .post(`${SERVER_ADDRESS}reviews`, body, config)
            .then((response) => {
                setData(response.data.data);
                setLoading(false);
                setError(false);
            })
            .catch((err) => {
                console.log(err.response.data.logOut);
                if (err.response.data.logOut === true) {
                    updateLoginStatus(true);
                }
                setError(true);
                setLoading(false);
            });

    }

    if (reviewGetLoading || loading) {
        return <div className='h-25 d-flex justify-content-center align-items-center'>
            <div className="bars"></div>
        </div>
    }

    if (reviewGetError || error) {
        return <div className="d-flex align-items-center justify-content-center h-25 text-light">
            <div className="text-center">
                <h3 className=" fw-bold">500</h3>
                <p className="fs-6"> <span className="text-danger">Opps!</span> Unable to fetch review.</p>
                <p className="lead">
                    Please try again after some time.
                </p>
            </div>
        </div>
    }

    if (reviewGetData[0]) {
        return <div>
            <h5 className='text-secondary'>Your feedback</h5>
            <Rating
                style={{ maxWidth: 150 }}
                value={reviewGetData[0].stars}
                readOnly={true}
            />
            {
                reviewGetData[0].review || reviewGetData[0].review !== "" ?
                    <>
                        <h6 className='text-secondary mt-2'>Your review</h6>
                        <p className='bg-dark border rounded p-3 w-xs-100 w-sm--75'>
                            {reviewGetData[0].review}
                        </p>
                    </>
                    :
                    <></>
            }
        </div>
    }


    return (
        <div>
            <h5 className='text-secondary'>Give feedback</h5>
            <Rating
                style={{ maxWidth: 150 }}
                value={rating}
                onChange={setRating}
            />
            <Form>
                <Form.Group className="mt-3 w-xs-100 w-sm--75 text-secondary" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Write review</Form.Label>
                    <Form.Control
                        as="textarea"
                        className='bg-dark text-light'
                        rows={5}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        maxLength={250}
                    />
                </Form.Group>
            </Form>
            <div className="mt-3 w-xs-100 w-sm--75 d-flex justify-content-end">
                <button type='button' className='btn btn-success d-block' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default OrderReview;
