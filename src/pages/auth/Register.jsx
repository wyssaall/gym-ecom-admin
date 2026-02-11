import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/index.css'

function Register() {
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
        <form className='flex flex-col gap-4 w-full'>

          {/* Name */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-600'>Full Name</label>
            <input
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              type="text"
              placeholder='Enter your name'
            />
          </div>

          {/* Email */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-600'>Email</label>
            <input
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              type="email"
              placeholder='Enter your email'
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-600'>Password</label>
            <input
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              type="password"
              placeholder='Create password'
            />
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm text-gray-600'>Confirm Password</label>
            <input
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
              type="password"
              placeholder='Confirm password'
            />
          </div>

          {/* Register Button */}
          <button
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
