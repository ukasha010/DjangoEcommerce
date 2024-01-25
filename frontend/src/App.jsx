import { useEffect, useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/navbar'
import Home from './pages/home'

import UploadImages from './pages/uploadImages'
import Login from './pages/login'
import Signup from './pages/signup'
import ForgotPassword from './pages/forgotpassword'
import Product from './components/product'
import BuyProduct from './pages/buyProduct'
import Slideshow from './components/slide'
import ActivationComponent from './components/ActivationComponent'
import Activate from './pages/accountactivated'
import ResetPasswordComponent from './components/ForgotPassword'
import Cart from './components/cart'
import ChangePassword from './pages/changepassword'
import axios from 'axios'


function App() {
  const [showCart, setShowCart] = useState(false);

  const [prodQuan, setProdQuan] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  const [AllProducts, setAllProducts] = useState({});

  const handleIncrement = (e) => {
    e.preventDefault();
    setProdQuan(prodQuan + 1); // Update prodQuan state using setter function
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (prodQuan > 0) {
      setProdQuan(prodQuan - 1); // Update prodQuan state using setter function
    }
  };
  const handleAllProducts = (data) => {
    setAllProducts(data)
  }
  useEffect(() => {
    axios.get("http://localhost:8000/products/").then(res => handleAllProducts(res)).catch(err => console.log(err))

  }, [AllProducts])
  return (
    <>

      <Navbar
        setShowCart={setShowCart}
      />
      {showCart && <Cart
        showCart={showCart}
        setShowCart={setShowCart}
        prodQuan={prodQuan}
        setProdQuan={setProdQuan}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      />}
      <Routes>
        <Route path='/' element={<Home
          AllProducts={AllProducts} />} />
        <Route path='/upload' element={<UploadImages />} />
        <Route path='/upload' element={<UploadImages />} />
        <Route path='/prod' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/slide' element={<Slideshow />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/auth/verify-email/:uid/:token' element={<ActivationComponent />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/auth/forgot-password-confirm/:uid/:token' element={<ResetPasswordComponent />} />
        <Route path='/change-password' element={<ChangePassword />} />

      </Routes>

    </>
  )
}

export default App
