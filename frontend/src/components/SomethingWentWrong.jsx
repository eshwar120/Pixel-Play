import React from 'react'
import { Link } from 'react-router-dom'

export default function SomethingWentWrong() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100-nav text-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold">500</h1>
        <p className="fs-3"> <span className="text-danger">Opps!</span> Something went wrong.</p>
        <p className="lead">
          Please try again after some time.
        </p>
        <Link to={"/"} className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  )
}
