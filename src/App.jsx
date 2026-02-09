import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Products from './pages/products/Products'
import ProductOne from './pages/products/ProductOne'
import Categories from './pages/categories/Ctegories'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login /> */}
      {/* <Dashboard/> */}
      {/* <Products /> */}
      {/* <ProductOne /> */}
      <Categories />
    </>
  )
}

export default App
