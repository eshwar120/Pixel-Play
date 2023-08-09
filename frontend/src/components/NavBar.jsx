import React, { useContext, useState } from 'react'
import BrandLogo from '../assets/brand-w.svg'
import '../styles/navbar.css'
import { Link, useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import profileLogo from '../assets/profile.svg';
import cartLogo from '../assets/cart.svg';
import { UserContext } from '../context/UserConext';

export default function NavBar() {

  const location = useLocation();
  // console.log(location)

  const [search, setSearch] = useState("");
  const { userData, cartData } = useContext(UserContext);
  // console.log(userData)
  const expand = "lg"
  return (
    <>
      {
        (location.pathname === "/signin" || location.pathname === '/signup') ?
          <></> :
          <Navbar data-bs-theme="dark" key={expand} expand={expand} className="bg-body-tertiary text-light  nav-bar-padding sticky-top" >
            <Container fluid>
              <Navbar.Brand >
                <Link title='Home' to={"/"} className='text-decoration-none d-flex align-items-center'>
                  <img className='nav-logo me-3' src={BrandLogo} alt="Play Pixel" />
                  <span className='fs-3 me-5 clr-white brand-font'>Play Pixel</span>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton className='off-canvas-container'>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body className='off-canvas-container off-canvas-body-container gap-3'>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      value={search}
                    />
                    <Link to={`/search/${search}`}>
                      <Button
                        variant="outline-success"
                      >Search
                      </Button>
                    </Link>
                  </Form>

                  <Nav className="justify-content-end flex-grow-1 pe-3 nav-items-vertical">
                    <Nav.Item className='nav-item-logo p-0 cursor-poiter d-flex'>
                      <Link to={`/profile/${userData.userID}`} className='text-decoration-none'>
                        <span className='profile-svg'>
                          <img title='Profile' className='nav-item-logo ' src={profileLogo} alt="Profile" />
                          <span className='fs-6 ms-1 clr-white'>Profile</span>
                        </span>
                      </Link>
                    </Nav.Item>
                    <Nav.Item className='nav-item-logo p-0 '>
                      <Link to={"/cart"} className='text-decoration-none d-flex align-items-center '>
                        <span className='profile-svg' >
                          <span className='cart-logo' data-count={`${cartData.length}`}>
                            <img title='Cart' className='nav-item-logo' src={cartLogo} alt="cart" />
                          </span>
                          <span className='fs-6 ms-2 clr-white'>Cart</span>
                        </span>
                      </Link>
                    </Nav.Item>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
      }
    </>
  )
}
