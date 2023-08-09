import React, { useContext, useEffect } from 'react'
import profile from '../assets/boy.png'
import { UserContext } from '../context/UserConext'
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {

  const { userData, loginStatus, updateLoginStatus } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    loginStatus ? <></> : navigate('/signin')
  })

  return (
    <>
      {
        loginStatus ?
          <div className='d-flex flex-column align-items-center justify-content-center vh-100-nav p-5 gap-lg-4 gap-sm-3 gap-2 text-light'>
            <img src={"https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/Banner%2Fboy.png?alt=media&token=58e2c90e-59be-43c5-bb0b-3e95e94945f5"} alt={userData.name} />
            <h2 className='text-capitalize'>Hello {userData.name}</h2>
            <Link to={"/orders"} className='text-decoration-none'>
              <button className='btn w-150px btn-outline-success gap-2 d-flex text-light justify-content-center align-items-center'>
                Orders
              </button>
            </Link>
            <Link to={"/"} className='text-decoration-none '>
              <button
                onClick={() => {
                  updateLoginStatus(true)
                }}
                className='btn w-150px btn-outline-danger gap-2 d-flex text-light justify-content-center align-items-center'>
                Logout
              </button>
            </Link>
          </div>
          :
          <></>
      }
    </>
  )
}
