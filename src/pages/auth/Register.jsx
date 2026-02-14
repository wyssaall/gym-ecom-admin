import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/index.css'
import authService from '../../services/authService.js'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const data = await authService.register({ name, email, password })
      // Assuming register also returns a token. If not, redirect to login.
      // Based on backend controller code: res.json({message:"admin created successfully", newAdmin:...})
      // It creates a token but puts it in the admin object as 'token' property? 
      // Checking backend controller: newAdmin.token = token; await newAdmin.save();
      // It doesn't seem to return the token in the top level of the JSON response for REGISTER, only for LOGIN.
      // Register response: {message: "...", newAdmin: {name, email}}
      // Wait, let me re-read backend controller: 
      // const token = generateJWT(...); newAdmin.token = token; ... res.status(200).json({..., newAdmin:{...}})
      // It DOES NOT return the token directly to the frontend for auto-login.
      // So for register, we should redirect to login.

      navigate('/login')
    } catch (err) {
      console.error("Register failed", err)
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className='bg-gradient-to-r from-gray-100 to-gray-600 min-h-screen flex justify-center items-center flex-col'>

      {/* Card */}
      <div className='bg-white w-full max-w-md rounded-2xl shadow-xl px-8 py-10 flex flex-col justify-center items-center gap-6'>

        {/* Title */}
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800'>Create Admin Account</h2>
          <p className='text-sm text-gray-500 mt-1'>
            Please fill in your information
          </p>
        </div>

        {/* Form */}
        <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>

          {/* Name */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-600'>Full Name</label>
            <input
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              type="text"
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder='Create password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-600'>Confirm Password</label>
            <input
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              type="password"
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Register Button */}
          <button
            type="submit"
            className='mt-4 py-2 bg-gray-800 rounded-2xl font-semibold text-white hover:bg-gray-700 transition'
          >
            Register
          </button>

        </form>

        {/* Login Link */}
        <p className='text-sm text-gray-500'>
          Already have an account?{' '}
          <Link
            to="/login"
            className='text-gray-800 font-semibold hover:underline'
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register
