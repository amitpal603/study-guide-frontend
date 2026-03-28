import React, { useContext, useState } from 'react'
import { userAuth } from '../../context/studyGuide'
import Loader from './common/Loader'

function Verify() {
  const { EmailVerifyHandler, loading } = useContext(userAuth)

  const [input, setInput] = useState({
    email: "",
    otp: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return  // prevent multiple clicks

    try {
      await EmailVerifyHandler(input)
    } catch (error) {
      console.log(error?.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-lg rounded-2xl p-8 w-full max-w-md'>
        
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>
            Email Verification
          </h1>
          <p className='text-gray-500 text-sm mt-2'>
            Enter your email and OTP to verify
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            name='email'
            type="email"
            value={input.email}
            onChange={handleChange}
            required
            placeholder='Enter Your Registered Email'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <input
            type="text"
            name='otp'
            value={input.otp}
            onChange={handleChange}
            required
            placeholder='Enter Here OTP'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
          >
            {loading ? <Loader /> : "Verify Email"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Verify