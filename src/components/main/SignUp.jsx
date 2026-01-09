import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#f67280] via-[#f8939b] to-[#f67280] flex items-center justify-center p-6'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl h-auto mt-20'>
        <h1 className='text-4xl font-bold text-[#f67280] text-center mb-8'>Sign Up</h1>
        
        <div className='space-y-5'>
          {/* Row 1: Username and Email */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='flex flex-col'>
              <label htmlFor="username" className='text-gray-700 font-semibold mb-2 text-sm'>
                Username
              </label>
              <input 
                id="username"
                type="text" 
                placeholder='Username or Full name' 
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280] focus:ring-2 focus:ring-[#f67280]/20 transition-all text-gray-700 placeholder-gray-400'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="email" className='text-gray-700 font-semibold mb-2 text-sm'>
                Email
              </label>
              <input 
                id="email"
                type="text" 
                placeholder='Email or Phone no' 
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280] focus:ring-2 focus:ring-[#f67280]/20 transition-all text-gray-700 placeholder-gray-400'
              />
            </div>
          </div>

          {/* Row 2: Password and University */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
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

            <div className='flex flex-col'>
              <label htmlFor="university" className='text-gray-700 font-semibold mb-2 text-sm'>
                University
              </label>
              <input 
                id="university"
                type="text" 
                placeholder='Enter University name' 
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280] focus:ring-2 focus:ring-[#f67280]/20 transition-all text-gray-700 placeholder-gray-400'
              />
            </div>
          </div>

          {/* Row 3: Course and Semester */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='flex flex-col'>
              <label htmlFor="course" className='text-gray-700 font-semibold mb-2 text-sm'>
                Course
              </label>
              <input 
                id="course"
                type="text" 
                placeholder='Enter Your Course' 
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280] focus:ring-2 focus:ring-[#f67280]/20 transition-all text-gray-700 placeholder-gray-400'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="semester" className='text-gray-700 font-semibold mb-2 text-sm'>
                Semester
              </label>
              <input 
                id="semester"
                type="text" 
                placeholder='Enter Your Semester' 
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280] focus:ring-2 focus:ring-[#f67280]/20 transition-all text-gray-700 placeholder-gray-400'
              />
              <p className='text-xs text-gray-500 mt-1.5 ml-1'>Please enter your semester only number</p>
            </div>
          </div>

          <button 
            type="button"
            className='active:scale-95 w-full bg-[#f67280] hover:bg-[#f5586e] text-white font-bold py-3.5 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-6'
          >
            Sign Up
          </button>

          <p className='text-center text-gray-600 text-sm mt-6'>
            Already have an account? 
            <Link to="/login" className='text-[#f67280] font-semibold ml-1 cursor-pointer hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp