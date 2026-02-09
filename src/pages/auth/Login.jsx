import React from 'react'
import '../../styles/index.css'

function Login() {
  return (
    <div className='bg-gradient-to-r from-gray-100 to-gray-600 min-h-screen flex justify-center items-center  flex-col '>
      {/* card */}
        <div className='bg-white w-full max-w-md rounded-2xl shadow-xl  px-8 py-10 flex flex-col justify-center items-center gap-6 '>
             {/* titre */}
             <div className='text-center'>
               <h2 className='text-3xl font-bold  text-gray-00'>Admin space</h2>
               <p className=' text-sm text-gray-500  mt-1'>welcome back! please enter your details</p>
             </div>
             {/* form */}
           <form className='flex flex-col gap-4'>
             {/* email */}
             <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-600'>Email</label>
             <input className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500' type="email" id='email' placeholder='Please enter your email'/>
             </div>
              {/* password */}
             <div className='flex flex-col gap-2'>
               <label className='text-sm text-gray-600' >Password</label>
               <input className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500' type="password" id='pass' placeholder='Please enter your password'/>
             </div>
             {/* options */}
             <div className='flex flex-row justify-between gap-6 text-sm text-gray-500'>
              <div className=' flex flex-row gap-2 items-center'>
                <input type="checkbox" name="remember-me" id="rem" />
                <label htmlFor="rem">Remember me</label>
              </div>
              <div>
                   <button type='button' className='cursor-pointer hover:underline transition duration-500 '>forgot password?</button> 
              </div>
             </div>
             <button className='cursor-pointer mt-4  py-2 bg-gray-800 border rounded-2xl font-semibold text-white hover:bg-gray-700 transition duration-200 '>Login</button>
           </form>
        </div>
    </div>
  )
}

export default Login