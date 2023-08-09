import React, { useContext, useState, useEffect } from 'react'
import '../styles/utils.css'
import '../styles/signin.css'
import brandLogo from '../assets/brand-w.svg';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import SweetAlert2 from 'react-sweetalert2';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserConext';
import { useNavigate, Link } from 'react-router-dom';



export default function SignIn() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  // console.log(loginData)
  const [disable, setDisable] = useState(false);
  const { SERVER_ADDRESS, updateLoginStatus, updateUserData, loginStatus, updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    loginStatus ? navigate('/') : <></>
  }, []);

  const handleSignIn = async () => {
    // console.log('signing in');
    setDisable(true);
    if (loginData.email === "" || loginData.password === "") {
      toast.warn("Please enter your credentials");
      setDisable(false)
      return;
    }
    else if (!/\@[a-z]/.test(loginData.email)) {
      toast.warn("Email must contain @");
      setDisable(false)
      return;
    }

    const loading = toast.loading('Please wait signing in...');

    try {
      await fetch(`${SERVER_ADDRESS}users/signin`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 401) {
            throw new Error("Invalid user credentials");
          } else {
            throw new Error("Sign in failed.");
          }
        })
        .then(data => {
          // Handle the response from the API
          if (data.message === "Signed in successfully") {
            // console.log(data)
            // loading.update('Signed in successfully');
            toast.update(loading, {
              render: "Signed in successfully",
              type: "success",
              isLoading: false,
              autoClose: 4000
            })
            setDisable(false)
            updateUserData(data);
            updateLoginStatus(data.logOut);
            updateToken(data)
            navigate('/')
            // console.log('Response from server:', data);
          }
          else {
            toast('signed in failed')
            throw new Error("Sign in failed")
          }

        })
        .catch(error => {
          console.error('Error:', error.message);
          toast.update(loading, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 4000
          });
          setDisable(false)
        })
    }
    catch (err) {
      setUserData({ email: "", password: "" })
      setDisable(false);
      toast.update(loading, {
        render: err.message,
        type: "error",
        isLoading: false,
        autoClose: 4000
      });
    }
  }

  return (
    <div className='flx sign-in-container'>
      <div className="item-1"></div>
      <form
        className='flx input-conatiner'
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <section className='flx brand-container'>
          <img src={brandLogo} alt="Pixel Play" />
          <h2 className='clr-white'>Play Pixel</h2>
        </section>
        <h4 className='clr-light-black'>Good to see you again</h4>
        <FloatingLabel
          label="Email address"
        >
          <Form.Control
            type="email"
            className='input-fld'
            placeholder="name@example.com"
            onChange={(e) => {
              setLoginData(loginData => ({
                ...loginData,
                email: e.target.value
              }))
            }}
            value={loginData.email}
          />
        </FloatingLabel>

        <FloatingLabel
          label="Password"
        >
          <Form.Control
            type="password"
            className='input-fld'
            placeholder="name@example.com"
            onChange={(e) => {
              setLoginData(loginData => ({
                ...loginData,
                password: e.target.value
              }))
            }}
            value={loginData.password}
          />
        </FloatingLabel>

        <div className='sign-btn-container'>
          <button
            type='submit'
            className='sign-btn sign-btn-1'
            disabled={disable}
          >
            Sign in
          </button>
          <Link to={"/signup"} className='sign-btn sign-btn-anchor'>
            <button
              className='sign-btn-2'
              onClick={() => {
                navigate('/signup');
              }}
              disabled={disable}
            >
              Sign up
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}
