import React from 'react'
import { BsLightning } from "react-icons/bs";
import { IoStarOutline } from "react-icons/io5";
import { GiTrophyCup } from "react-icons/gi";
import { RiKey2Line } from "react-icons/ri";
import { FaThumbsUp } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";

function HomeFeature() {
  const features = [
    {title : "Fast Learning" , description : "This website will help you to learn quickly." , icon : <BsLightning/>},
    {title : "Important Material" , description : "Here we will provide subject wise study materials in the PDF format also." , icon : <IoStarOutline/>},
    {title : "Easy to Use" , description : "Well-designed modern website with attractive and clear interface. Easy to download & read any content." , icon : <GiTrophyCup/>},
    {title : "Success Key" , description : "This website helps in developing good study skills & motivates for self-study. It also shows the way towards success." , icon : <RiKey2Line/>},
    {title : "Quality Content" , description : "We provide quality content in an easy and understandable way and that will boost your confidence level." , icon : <FaThumbsUp/>},
    {title : "User-friendly Language" , description : "All content is available in easy language that anyone can understand." , icon : <FaHeadphonesAlt/>}
  ]
  
  return (
    <div className='w-full bg-gradient-to-br from-[#c06c84] to-[#c06c84] py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>Study guide Features That Makes a Dream Reality</h2>
          <p className='text-white/90 text-lg max-w-2xl mx-auto'>If you are looking for Notes, or if you may be confused in any Subject or in any Topic. Then you are at right place, at right time. We will help you as much as possible we can. Thanks...</p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {features.map((fea, index) => (
            <div 
              key={index}
              className='bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out'
            >
              <div className='w-14 h-14 bg-gradient-to-br from-[#c06c84] to-[#d88ca0] rounded-lg flex items-center justify-center text-white text-2xl mb-4 shadow-md'>
                {fea.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3'>{fea.title}</h3>
              <p className='text-gray-600 leading-relaxed'>{fea.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeFeature