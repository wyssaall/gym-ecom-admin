import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Products from './pages/products/Products'
import ProductOne from './pages/products/ProductOne'
import Categories from './pages/categories/Categories'
import Orders from './pages/orders/Orders'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import MainLayout from './layouts/MainLayout'
import Register from './pages/auth/Register'

function App() {

  return (
    <Router> 
      
      <Routes>        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<MainLayout />}>
         <Route path='/' element={<Dashboard />}></Route> 
         <Route path='/products' element={<Products />}></Route>
         <Route path='/products/:productId' element={<ProductOne />}></Route>
         <Route path='/categories' element={<Categories />}></Route>
         <Route path='/orders' element={<Orders />}></Route>
        </Route>
         
      </Routes>
    </Router>
  )
}

export default App
