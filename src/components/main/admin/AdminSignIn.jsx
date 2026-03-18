import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'   // ✅ FIX 1: Removed invalid `data` import
import { userAuth } from '../../../context/studyGuide'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

function AdminSignIn() {
  const [isAdmin, setIsAdmin] = useState("")
  const [secret, setSecret] = useState("")
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()
  const { loginUser } = useContext(userAuth)

  const LoginHandleData = (formData) => {   // ✅ FIX 2: Accept formData from react-hook-form

    // ✅ FIX 3: Must select Admin radio first
    if (isAdmin !== "admin") {
      toast.error("Please select Admin role.")
      return
    }

    // ✅ FIX 4: Secret validation — block login if secret is wrong, not if it's correct
    if (secret !== "studyGuide") {
      toast.error("Invalid secret code.")
      return
    }

    // ✅ FIX 5: Pass actual form data (email + password), not the router `data` import
    loginUser(formData)
    reset()
    navigate("/admin/study-guide/dashboard")
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f67280] via-[#f67280] to-[#f67280] flex items-center justify-center p-6'>
      <div className='w-full max-w-md'>
        {/* Main Card */}
        <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-pink-300/50 mt-20'>

          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-block p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mb-4 shadow-lg'>
              <svg className='w-12 h-12 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
              </svg>
            </div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2'>Admin Sign In</h1>
            <div className='w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full'></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(LoginHandleData)}>
            <div className='space-y-5'>

              {/* Admin Radio with Secret Code */}
              <div className='bg-gradient-to-r from-pink-50 to-rose-50 p-5 rounded-xl border-2 border-pink-200 transform transition-all duration-300 hover:border-pink-400 hover:shadow-lg'>
                <label className='flex items-center gap-3 cursor-pointer mb-4'>
                  <span className='font-semibold text-gray-700 text-sm'>Admin :</span>
                  <input
                    type="radio"
                    value="admin"
                    checked={isAdmin === "admin"}   // ✅ FIX 6: Use strict === comparison
                    onChange={(e) => setIsAdmin(e.target.value)}
                    className='w-5 h-5 text-pink-500 focus:ring-pink-400 focus:ring-2 cursor-pointer'
                  />
                </label>

                {/* Secret Code Field */}
                <div className={`transition-all duration-300 ${isAdmin === "admin" ? 'opacity-100 translate-y-0' : 'opacity-50'}`}>
                  <label className='block'>
                    <span className='block text-sm font-semibold text-gray-700 mb-2'>Secret :</span>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' />
                        </svg>
                      </div>
                      <input
                        type="password"   // ✅ FIX 7: Changed to password type for security
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        placeholder='Secret code...'
                        className='w-full pl-11 pr-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none bg-white'
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Email Field */}
              <div className='transform transition-all duration-300 hover:translate-x-1'>
                <label className='block'>
                  <span className='block text-sm font-semibold text-gray-700 mb-2'>Email or Phone :</span>
                  <div className='relative group'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg className='w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <input
                      type="text"
                      {...register("email", { required: true })}
                      placeholder='Email'
                      className='w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none hover:border-pink-300'
                    />
                  </div>
                </label>
              </div>

              {/* Password Field */}
              <div className='transform transition-all duration-300 hover:translate-x-1'>
                <label className='block'>
                  <span className='block text-sm font-semibold text-gray-700 mb-2'>Password :</span>
                  <div className='relative group'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg className='w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                      </svg>
                    </div>
                    <input
                      type="password"
                      {...register("password", { required: true })}
                      placeholder='Password'
                      className='w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none hover:border-pink-300'
                    />
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:to-rose-600 mt-6 active:scale-95'
              >
                <span className='flex items-center justify-center gap-2'>
                  Sign In
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </span>
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500'>
              Don't have an account?
              <span className='text-pink-500 font-semibold hover:text-pink-600 ml-1 transition-colors hover:underline'>
                <Link to="/admin-sign-up-study-guide">Sign Up</Link>
              </span>
            </p>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className='absolute top-10 left-10 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-pulse pointer-events-none'></div>
        <div className='absolute bottom-20 right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse pointer-events-none' style={{ animationDelay: '1s' }}></div>
        <div className='absolute top-1/2 left-20 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse pointer-events-none' style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  )
}

export default AdminSignIn