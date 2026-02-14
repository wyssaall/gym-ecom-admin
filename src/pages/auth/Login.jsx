import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/index.css'
import authService from '../../services/authService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = await authService.login(email, password)
      if (data.token) {
        localStorage.setItem('token', data.token)
        navigate('/')
      }
    } catch (err) {
      console.error("Login failed", err)
      setError(err.response?.data?.message || 'Invalid email or password')
    }
  }

  return (
    <div className='bg-gradient-to-r from-gray-100 to-gray-600 min-h-screen flex justify-center items-center flex-col'>

      {/* Card */}
      <div className='bg-white w-full max-w-md rounded-2xl shadow-xl px-8 py-10 flex flex-col justify-center items-center gap-6'>

        {/* Title */}
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800'>Admin Space</h2>
          <p className='text-sm text-gray-500 mt-1'>
            Welcome back! Please enter your details
          </p>
        </div>

        {/* Form */}
        <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>

          {/* Email */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-600'>Email</label>
            <input
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-600'>Password</label>
            <input
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              type="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Options */}
          <div className='flex justify-between text-sm text-gray-500'>

            <div className='flex gap-2 items-center'>
              <input type="checkbox" id="rem" />
              <label htmlFor="rem">Remember me</label>
            </div>

            <button
              type='button'
              className='hover:underline'
            >
              Forgot password?
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className='mt-4 py-2 bg-gray-800 rounded-2xl font-semibold text-white hover:bg-gray-700 transition'
          >
            Login
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        </form>

        {/* Register Link */}
        <p className='text-sm text-gray-500'>
          Don’t have an account?{' '}
          <Link
            to="/register"
            className='text-gray-800 font-semibold hover:underline'
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
