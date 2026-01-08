import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function StudyFooter() {
    const social = [
        {name : "Facebook" , icon : <FaFacebook/> , link : "#"},
        {name : "Instagram" , icon : <LuInstagram/> , link : "#"},
        {name : "Twitter" , icon : <FaSquareXTwitter/> , link : "#"}
    ]
    const legalInfo = [
        {name : "24/7 support" , link : "#"},
        {name : "Policy" , link : "#"},
        {name : "Terms and Conditions" , link : "#"}
    ]
    const pages = [
        {name : "Help" , link : "#"},
        {name : "Review & feedback" , link : "#"}
    ]
    
  return (
    <footer className='bg-[#355c7d] text-white w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
          
          {/* Quick Links Section */}
          <div>
            <h2 className='text-xl font-bold mb-6 text-white border-b-2 border-white/30 pb-2 inline-block'>
              Quick Links
            </h2>
            <div className='space-y-4'>
                {social.map((social, index) => (
                    <a 
                      key={index}
                      href={social.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex items-center gap-3 text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 group'
                    >
                        <span className='text-2xl group-hover:scale-110 transition-transform duration-300'>
                          {social.icon}
                        </span>
                        <span className='font-medium'>{social.name}</span>
                    </a>
                ))}
            </div>
          </div>

          {/* Legal Info Section */}
          <div>
            <h2 className='text-xl font-bold mb-6 text-white border-b-2 border-white/30 pb-2 inline-block'>
              Legal Info
            </h2>
            <div className='space-y-3'>
                {legalInfo.map((legal, index) => (
                  <p key={index}>
                    <Link 
                      to={legal.link}
                      className='text-white/90 hover:text-white hover:underline transition-all duration-200 block'
                    >
                      {legal.name}
                    </Link>
                  </p>
                ))}
            </div>
          </div>

          {/* Pages Section */}
          <div>
            <h2 className='text-xl font-bold mb-6 text-white border-b-2 border-white/30 pb-2 inline-block'>
              Support
            </h2>
            <div className='space-y-3'>
                {pages.map((page, index) => (
                    <p key={index}>
                        <Link 
                          to={page.link}
                          className='text-white/90 hover:text-white hover:underline transition-all duration-200 block'
                        >
                          {page.name}
                        </Link>
                    </p>
                ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-white/20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-white/80 text-sm text-center md:text-left'>
              © {new Date().getFullYear()} Study Platform. All rights reserved.
            </p>
            <p className='text-white/80 text-sm text-center md:text-right'>
              Made with ❤️ for learners
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default StudyFooter