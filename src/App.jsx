import './App.css'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Products from './pages/products/Products'
import ProductOne from './pages/products/ProductOne'
import Categories from './pages/categories/Categories'
import Orders from './pages/orders/Orders'
import Wilayas from './pages/wilayas/Wilayas'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import MainLayout from './layouts/MainLayout'
import Register from './pages/auth/Register'
import RequireAuth from './components/RequireAuth'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<RequireAuth />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:productId" element={<ProductOne />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/wilaya" element={<Wilayas />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    )
}

export default App
