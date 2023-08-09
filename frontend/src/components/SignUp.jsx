import React, { useContext, useState, useEffect } from 'react'
import '../styles/utils.css'
import '../styles/signin.css'
import brandLogo from '../assets/brand-w.svg';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserConext';
import { useNavigate, Link } from 'react-router-dom';


export default function SignUp() {
  const [signUpData, setsignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  // console.log(signUpData)
  const [disable, setDisable] = useState(false);
  const { loginStatus, SERVER_ADDRESS } = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    loginStatus ? navigate('/') : <></>
  }, []);


  const handleSignUp = async () => {
    setDisable(true);
    // console.log(signUpData)
    if (signUpData.name === "" || signUpData.email === "" || signUpData.password === "" || signUpData.confirmPassword === "") {
      toast.warn("All feilds are mandatory");
      setDisable(false)
      return;
    }
    else if(!/^[A-Za-z\s]+$/.test(signUpData.name)){
      toast.warn("Name must be alphabets");
      setDisable(false)
      return;
    }
    else if (signUpData.password !== signUpData.confirmPassword){
      toast.warn("Passwords should be matching");
      setDisable(false)
      return;
    }
    else if (!/\@[a-z]/.test(signUpData.email)) {
      toast.warn("Email must contain @");
      setDisable(false)
      return;
    }
    else if (!/[0-9]/.test(signUpData.password)) {
      toast.warn("Passwod should contain a number")
      setDisable(false)
      return;
    }
    else if (!/[a-z]/.test(signUpData.password)) {
      toast.warn("Passwod should contain a lowercase alphabet")
      setDisable(false)
      return;
    }
    else if (!/[A-Z]/.test(signUpData.password)) {
      toast.warn("Passwod should contain a uppercase alphabet")
      setDisable(false)
      return;
    }
    else if (signUpData.password.length > 16 || signUpData.password.length < 8) {
      toast.warn("Password must contain atleast 8-16 letters")
      setDisable(false)
      return;
    }

    const loading = toast.loading('Please wait signing up...');
    await fetch(`${SERVER_ADDRESS}users/signup`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpData)
    })
      .then(response => {
        // console.log(response)
        if (response.status === 201) {
          toast.update(loading, {
            render: "Signed up successfully",
            type: "success",
            isLoading: false,
            autoClose: 4000
          });
          setDisable(false)
          navigate('/signin')
          return response.json();
        }
        toast.update(loading, {
          render: "User already exist",
          type: "error",
          isLoading: false,
          autoClose: 4000
        })
        setDisable(false)
      })
      .then(data => {
        // console.log(data)
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
      });
    setsignUpData({ email: "", password: "", confirmPassword: "" })
  }


  return (
    <div className='flx sign-in-container'>
      <div className="item-1"></div>
      <form
        className='flx input-conatiner'
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        <section className='flx brand-container'>
          <img src={brandLogo} alt="Pixel Play" />
          <h2 className='clr-white'>Play Pixel</h2>
        </section>
        <h4 className='clr-light-black'>Create new account</h4>

        <FloatingLabel
          label="Name"
        >
          <Form.Control
            type="text"
            className='input-fld'
            placeholder="Name"
            onChange={(e) => {
              setsignUpData(signUpData => ({
                ...signUpData,
                name: e.target.value
              }))
            }}
            value={signUpData.name}
          />
        </FloatingLabel>

        <FloatingLabel
          label="Email address"
        >
          <Form.Control
            type="email"
            className='input-fld'
            placeholder="name@example.com"
            onChange={(e) => {
              setsignUpData(signUpData => ({
                ...signUpData,
                email: e.target.value
              }))
            }}
            value={signUpData.email}
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
              setsignUpData(signUpData => ({
                ...signUpData,
                password: e.target.value
              }))
            }}
            value={signUpData.password}
          />
        </FloatingLabel>

        <FloatingLabel
          label="Confirm password"
        >
          <Form.Control
            type="text"
            className='input-fld'
            placeholder="Confirm password"
            onChange={(e) => {
              setsignUpData(signUpData => ({
                ...signUpData,
                confirmPassword: e.target.value
              }))
            }}
            value={signUpData.confirmPassword}
          />
        </FloatingLabel>

        <div className='sign-btn-container'>
          <button
            type='submit'
            className='sign-btn sign-btn-1'
            disabled={disable}
          >
            Sign up
          </button>
          <Link to={"/signin"} className='sign-btn sign-btn-anchor'>
            <button
              className='sign-btn-2'
              onClick={() => {
                // navigate('/signin');
              }}
              disabled={disable}
            >
              Sign in
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}
