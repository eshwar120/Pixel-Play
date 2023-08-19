import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
// import './App.css'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Cart from './components/Cart'
import ProductInfo from './components/ProductInfo'
import NotFound from './components/NotFound'
import NavBar from './components/NavBar'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/UserConext'
import Footer from './components/Footer'
import '@smastrom/react-rating/style.css'
import Search from './components/Search'
import Profile from './components/Profile'
import { useContext } from 'react'
import OrdersInfo from './components/OrdersInfo'
import Order from './components/Order'
import CheckoutSuccess from './components/CheckoutSuccess'

function App() {

  const { loginStatus } = useContext(UserContext);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <NavBar />
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
        <Route path='/orders' element={<OrdersInfo />} />
        <Route path="/orders/:orderID" element={<Order />} />
        <Route path='/product/:productID' element={<ProductInfo />} />
        <Route path='/search/:productName' element={<Search />} />
        <Route path='/profile/:userID' element={<Profile />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
