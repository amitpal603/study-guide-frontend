import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userAuth } from '../../context/studyGuide'

function SignUp() {

  const { register, handleSubmit, registerUser } = useContext(userAuth)

  const HandleRegisterData = async (data) => {
    try {
      await registerUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#f67280] via-[#f8939b] to-[#f67280] flex items-center justify-center p-6'>
      
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl h-auto mt-20'>
        
        <h1 className='text-4xl font-bold text-[#f67280] text-center mb-8'>
          Sign Up
        </h1>

        {/* FIXED FORM */}
        <form onSubmit={handleSubmit(HandleRegisterData)} className='space-y-5'>

          {/* Username + Email */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

            <div className='flex flex-col'>
              <label className='text-gray-700 font-semibold mb-2 text-sm'>
                Username
              </label>

              <input
                type="text"
                placeholder='John Doe'
                {...register("username", { required: true })}
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280]'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-700 font-semibold mb-2 text-sm'>
                Email
              </label>

              <input
                type="email"
                placeholder='example@gmail.com'
                {...register("email", { required: true })}
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280]'
              />
            </div>

          </div>

          {/* Password + University */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

            <div className='flex flex-col'>
              <label className='text-gray-700 font-semibold mb-2 text-sm'>
                Password
              </label>

              <input
                type="password"
                placeholder='Password'
                {...register("password", { required: true })}
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280]'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-700 font-semibold mb-2 text-sm'>
                University
              </label>

              <input
                type="text"
                placeholder='Enter University name'
                {...register("university")}
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280]'
              />
            </div>

          </div>

          {/* Course + Semester */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

            <div className='flex flex-col'>
              <label className='text-gray-700 font-semibold mb-2 text-sm'>
                Course
              </label>

              <input
                type="text"
                placeholder='Enter Your Course'
                {...register("course")}
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280]'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-700 font-semibold mb-2 text-sm'>
                Semester
              </label>

              <input
                type="number"
                placeholder='Enter Your Semester'
                {...register("semester")}
                className='px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#f67280]'
              />

              <p className='text-xs text-gray-500 mt-1'>
                Please enter semester number
              </p>
            </div>

          </div>

          <button
            type="submit"
            className='active:scale-95 w-full bg-[#f67280] hover:bg-[#f5586e] text-white font-bold py-3.5 rounded-lg mt-6'
          >
            Sign Up
          </button>

          <p className='text-center text-gray-600 text-sm mt-6'>
            Already have an account?

            <Link
              to="/login-account"
              className='text-[#f67280] font-semibold ml-1 hover:underline'
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  )
}

export default SignUp