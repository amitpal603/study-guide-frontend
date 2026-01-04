import React from 'react'
import about from "/src/assets/about.jpg"
import { useNavigate } from 'react-router-dom'

function HomeContentFeature() {
    const navigate = useNavigate()
  return (
    <div className='bg-gradient-to-br from-[#c06c84] to-[#a54d68] text-white w-full py-16 lg:py-24 relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-center'>
          
          {/* Left part - Image (shows FIRST on mobile, LEFT on desktop) */}
          <div className='w-full lg:w-[50%] order-1'>
            <div className='relative group'>
              {/* Glow Effect */}
              <div className='absolute -inset-1 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse'></div>
              
              {/* Image Container */}
              <div className='relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform group-hover:scale-[1.02] transition-all duration-500'>
                <img 
                  src={about} 
                  alt="about" 
                  className='w-full h-auto object-cover group-hover:brightness-110 transition-all duration-500'
                />
                {/* Overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-[#c06c84]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
              </div>
            </div>
          </div>

          {/* Right part - Content (shows SECOND on mobile, RIGHT on desktop) */}
          <div className='w-full lg:w-[50%] space-y-6 order-2'>
            
            {/* Title */}
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
              <span className='block mb-2'>
                All Content in{' '}
                <span className='text-yellow-300 underline decoration-yellow-300/30 decoration-4 underline-offset-4'>
                  Simple Language
                </span>
              </span>
              <span className='block mb-2'>
                and{' '}
                <span className='text-green-300 underline decoration-green-300/30 decoration-4 underline-offset-4'>
                  Ad-Free
                </span>
              </span>
              <span className='block mt-3'>
                Study <span className='text-[#3674b5] font-extrabold bg-white px-3 py-1 rounded-lg shadow-lg'>Gu</span>ide
              </span>
            </h1>

            {/* Description */}
            <p className='text-base sm:text-lg leading-relaxed text-gray-100'>
              We have created <span className='font-bold text-yellow-300'>Study Guide</span> (this website) to help others for free. We made this website as simple as possible, that anyone can run smoothly on their phone and computer. 
              <br /><br />
              We have simple PDF's and Notes of the Course <span className='font-bold text-green-300'>BCA, MCA, B.Com</span> etc, which will help you in quick reading and memorization. If you have any trouble in understanding any topic, then you came at right place. 
              <span className='font-semibold'> We will help you to eliminate all your problems.</span>
            </p>

            {/* Button */}
            <div className='pt-6'>
              <button onClick={() => navigate("/about")} className='group relative px-8 py-4 bg-white text-[#c06c84] font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden'>
                <span className='relative z-10 flex items-center justify-center gap-2'>
                  About Us
                  <svg 
                    className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300' 
                    fill='none' 
                    stroke='currentColor' 
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </span>
                {/* Hover gradient effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full'></div>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Decorative floating shapes */}
      <div className='absolute top-20 left-10 w-24 h-24 bg-yellow-300/10 rounded-full blur-2xl animate-pulse pointer-events-none'></div>
      <div className='absolute bottom-20 right-10 w-32 h-32 bg-pink-300/10 rounded-full blur-2xl animate-pulse pointer-events-none' style={{ animationDelay: '1s' }}></div>
      <div className='absolute top-1/2 left-1/4 w-20 h-20 bg-blue-300/10 rounded-full blur-xl animate-pulse pointer-events-none' style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}

export default HomeContentFeature