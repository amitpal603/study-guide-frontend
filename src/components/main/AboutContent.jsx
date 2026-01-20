import React, { useState, useEffect } from 'react';
import about from "/src/assets/about.jpg"
function AboutContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  
  return (
    <div className="w-full  py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Content First (top), Image Second (bottom) */}
        {/* Desktop: Image Left, Content Right */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          
          {/* Left side - Image */}
          <div className={`w-full md:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 md:translate-x-0 translate-y-0' : 'opacity-0 md:-translate-x-10 translate-y-10'}`}>
            <div className="relative group">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#f67280] to-[#fa5f6f] rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={about} 
                  alt="about" 
                  className="w-200 h-120 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 md:translate-x-0 translate-y-0' : 'opacity-0 md:translate-x-10 -translate-y-10'}`}>
            <div className="space-y-6">
              {/* Main heading */}
              <h1 className="text-5xl md:text-6xl font-bold text-white bg-clip-text leading-tight">
                Study <span className='text-[#3674b5]'>Gu</span>ide
              </h1>

              {/* Subheading */}
              <h5 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
                Why our website is the best?
              </h5>

              {/* Divider */}
              <div className="w-20 h-1 bg-gradient-to-r from-[#f67280] to-[#fa5f6f] rounded-full"></div>

              {/* Description */}
              <p className="text-lg text-gray-700 leading-relaxed">
                We have created this website to help others for free. We made this website as simple as possible, that anyone can run smoothly on their phone and computer. We have simple PDF and Notes of the any course subject , which will help in quick reading and memorization. If you having trouble understanding a topic, then you have come at right place. We will help eliminate all your problems.
              </p>

              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl font-bold text-[#f67280] mb-1">100%</div>
                  <div className="text-sm text-gray-600">Free Content</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl font-bold text-[#f67280] mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="mt-6 px-8 py-4 bg-gradient-to-r from-[#f67280] to-[#fa5f6f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Explore Resources
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutContent;