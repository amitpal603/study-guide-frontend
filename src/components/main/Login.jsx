import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#f67280] via-[#f8939b] to-[#f67280] flex items-center justify-center p-6'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mt-20'>
        <h1 className='text-4xl font-bold text-[#f67280] text-center mb-8'>Login</h1>
        
        <div className='space-y-5'>
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-gray-700 font-semibold mb-2 text-sm'>
              Email or Phone
            </label>
            <input 
              id="email"
              type="text" 
              placeholder='Email or Phone no' 
              className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280] focus:ring-2 focus:ring-[#f67280]/20 transition-all text-gray-700 placeholder-gray-400'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="password" className='text-gray-700 font-semibold mb-2 text-sm'>
              Password
            </label>
            <input 
              id="password"
              type="password" 
              placeholder='Password' 
              className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280] focus:ring-2 focus:ring-[#f67280]/20 transition-all text-gray-700 placeholder-gray-400'
            />
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center text-gray-600 cursor-pointer'>
              <input type="checkbox" className='mr-2 w-4 h-4 accent-[#f67280]' />
              Remember me
            </label>
            <span className='text-[#f67280] font-semibold cursor-pointer hover:underline'>
              <Link to="/forget-password">
              Forgot Password?
              </Link>
            </span>
          </div>

          <button 
            type="button"
            className='active:scale-95 w-full bg-[#f67280] hover:bg-[#f5586e] text-white font-bold py-3.5 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-6'
          >
            Login
          </button>

          <p className='text-center text-gray-600 text-sm mt-6'>
            Don't have an account? 
            <span className='text-[#f67280] font-semibold ml-1 cursor-pointer hover:underline'>
              <Link to="/sign-up">
              Sign Up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login