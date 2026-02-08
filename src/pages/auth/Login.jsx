import React from 'react'
import '../../styles/index.css'

function Login() {
  return (
    <div class='bg-gradient-to-r from-gray-100 to-gray-600 h-screen flex justify-center items-center  flex-col '>
        <h3>Admin space</h3>
        <div class='bg-white w-2/5 h-3/5 rounded-2xl shadow-xl  p-10 flex flex-col justify-center items-center gap-5 '>
           <h3>welcome back</h3>
           <p>please enter your details</p>
           <form action="">
            <label ></label>
             <input type="email" id='email' placeholder='Please enter your email'/>
             <input type="password" id='pass' placeholder='Please enter your password'/>
           </form>
           <div>
                <div>
                <input type="checkbox" name="remember-me" id="rem" />
                <label for="rem">Remember me</label>
                </div>
                <div>
                   <h5>forgot password?</h5> 
                </div>
           </div>
           <button>Login</button>
        </div>
    </div>
  )
}

export default Login