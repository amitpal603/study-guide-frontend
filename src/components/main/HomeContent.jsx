import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function HomeContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('University');
  const navigate = useNavigate()
  const handleSearch = (e) => {
    e.preventDefault();
    
    const query = searchQuery.trim().toLowerCase()

    if(!query) return

    if(query === "mgkvp" || query.includes("mahatma gandhi kashi vidyapith")){
      navigate("/mgkvp-university")
    }
    else if(query === "aktu" || 
    query.includes("abdul kalam technical university") || 
    query.includes("apj abdul kalam")) {
      navigate("/aktu-university")
    }
    else {
    alert("University not found");
  }

    setSearchQuery("")
  };

  const categories = [
    { name: 'University', icon: '🎓' },
    { name: 'Notes PDF', icon: '📄' },
    { name: 'Course', icon: '📚' },
    { name: 'Semester', icon: '📅' },
    { name: 'Syllabus', icon: '📋' },
    { name: 'Exam Paper', icon: '📝' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f67280] via-[#f67280] to-[#e55d6d]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading Section */}
          <div className="mb-8 sm:mb-12 mt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              Smart Way of{' '}
              <span className="text-[#3674b5] bg-white px-3 py-1 rounded-lg inline-block transform hover:scale-105 transition-transform duration-300">
                Easy Learning
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto px-4 drop-shadow-md">
              Learn something new from self-study every time with the help of our website. 
              This is a non-profitable website. Here you can study for free without any advertisement.
            </p>
          </div>

          {/* Search Form */}
          <form 
            onSubmit={(e) => handleSearch(e)}
            className="max-w-2xl mx-auto mb-12 sm:mb-16 px-4"
          >
            <div className="relative flex items-center bg-white rounded-full shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-3xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search University..."
                className="flex-1 px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
              />
              <button 
              disabled={!searchQuery}
                type="submit"
                className=" active:scale-95 disabled:cursor-not-allowed bg-[#3674b5] text-white px-6 sm:px-8 py-4 sm:py-5 hover:bg-[#2d5d95] transition-all duration-300 flex items-center justify-center group"
                aria-label="Search"
              >
                <BsSearch className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </form>

          {/* Study Guide Highlights Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-2xl mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 drop-shadow-lg">
              Study Guide Highlights
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    activeCategory === category.name
                      ? 'bg-white text-[#f67280] shadow-xl scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="text-2xl sm:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </span>
                    <span className="text-center leading-tight">
                      {category.name}
                    </span>
                  </div>
                  
                  {/* Ripple effect on hover */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;