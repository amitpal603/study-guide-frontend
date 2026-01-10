import React from 'react'

function NotFound() {
    const root = window.location.pathname
  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#f67280] via-[#f67280] to-[#f67280] flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="mb-8 animate-bounce">
          <h1 className="text-9xl font-extrabold text-white opacity-90 tracking-tight">
            404
          </h1>
        </div>
        
        {/* Glowing line separator */}
        <div className="w-32 h-1 bg-white mx-auto mb-8 rounded-full shadow-lg shadow-white/50 animate-pulse"></div>
        
        {/* Main message */}
        <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
          Page Not Found
        </h2>
        
        <p className="text-xl text-white/90 mb-2 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Path display */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 mb-8 inline-block">
          <code className="text-white font-mono text-sm break-all">
            {root}
          </code>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/"
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
        
        {/* Decorative floating elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-100"></div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default NotFound