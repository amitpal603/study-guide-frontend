import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import AboutContent from './AboutContent';

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentPage = window.location.pathname.split("-")[0].split("/")[1].toUpperCase();

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-[#f67280] via-[#f67280] to-[#fa5f6f] relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 mt-20">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg animate-fadeInScale">
            About <span className=' text-[#3674b5]'>Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-light">
            Learn something new from self-study every time with the help of our website
            <span className="font-semibold"> Study Guide</span>
          </p>
        </div>

        <div className={`mt-12 sm:mt-20 flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Breadcrumb Navigation */}
            <div className="w-full sm:w-auto max-w-md bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4 sm:p-6 shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-300">
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-6">
                {/* Home Link */}
                <Link 
                  to="/" 
                  className="group flex items-center gap-2 text-white hover:text-white/80 transition-all duration-300"
                >
                  <div className="p-2 sm:p-3 bg-white/20 rounded-full group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                    <Home size={18} className="sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold tracking-wide group-hover:tracking-wider transition-all duration-300">
                    HOME
                  </h2>
                </Link>

                {/* Chevron Separator */}
                <ChevronRight className="text-white/60 flex-shrink-0" size={24} />

                {/* Current Page */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 sm:p-3 bg-white/30 rounded-full animate-pulse">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-white tracking-normal">
                    {currentPage || 'ABOUT'}
                  </p>
                </div>
              </div>
            </div>
          </div>       
      </div>
      <AboutContent/>
    </div>
  );
}

export default About