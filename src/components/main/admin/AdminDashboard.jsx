import React, { useState, useEffect } from 'react'
import UploadContent from './material/UploadContent'
import UserDetail from './material/UserDetail'

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Auto-close sidebar on mobile
      if (mobile) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const adminMenu = [
    { id: 1, title: "Add Content", path: "/add-content-material", icon: "📝" },
    { id: 2, title: "Users Manage", path: "/users-details", icon: "👥" },
    { id: 3, title: "All Material", path: "/material-details", icon: "📚" }
  ]

  const stats = [
    { label: "Total Users", value: "1,234", change: "+12%", icon: "👤" },
    { label: "Total Content", value: "567", change: "+8%", icon: "📄" },
    { label: "Active Sessions", value: "89", change: "+23%", icon: "⚡" },
    { label: "New This Week", value: "45", change: "+15%", icon: "🆕" }
  ]

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId)
    // Auto-close sidebar on mobile after selection
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-100 to-pink-50 flex relative'>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className='fixed inset-0  bg-opacity-50 z-30 md:hidden'
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Left Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isMobile ? 'fixed left-0 top-0 h-full w-72 z-40' : 'relative'
        } ${
          !isMobile && isSidebarOpen ? 'w-72' : !isMobile ? 'w-20' : 'w-72'
        } bg-gradient-to-b from-[#355c7d] to-[#2a4a5e] text-white transition-all duration-500 ease-in-out shadow-2xl flex-shrink-0`}
      >
        {/* Mobile Close Button */}
        {isMobile && isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className='absolute right-4 top-4 text-white hover:text-rose-300 transition-colors z-50 md:hidden'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        )}

        {/* Sidebar Header */}
        <div className='p-4 sm:p-6 border-b mt-16 sm:mt-20'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center text-xl animate-pulse'>
              👨‍💼
            </div>
            {(isSidebarOpen || isMobile) && (
              <div className='animate-fadeIn'>
                <h2 className='text-lg sm:text-xl font-bold'>Admin Panel</h2>
                <p className='text-xs text-gray-300'>Manage Everything</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className='p-3 sm:p-4 space-y-2'>
          {adminMenu.map((menu, index) => (
            <button
              key={menu.id}
              onClick={() => handleMenuClick(menu.id)}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`w-full text-left px-3 sm:px-4 py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center gap-3 sm:gap-4 group hover:scale-105 animate-slideInLeft ${
                activeMenu === menu.id
                  ? 'bg-rose-500 shadow-lg shadow-rose-500/50'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className='text-xl sm:text-2xl group-hover:scale-125 transition-transform duration-300'>
                {menu.icon}
              </span>
              {(isSidebarOpen || isMobile) && (
                <div className='flex-1'>
                  <span className='font-medium text-sm'>{menu.title}</span>
                  <div className={`h-0.5 w-0 group-hover:w-full  transition-all duration-500 mt-1`}></div>
                </div>
              )}
              {activeMenu === menu.id && (
                <span className='w-2 h-2 bg-white rounded-full animate-ping'></span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className='absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t'>
          <div className='flex items-center gap-3 px-2'>
            <div className='w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-lg'>
              A
            </div>
            {(isSidebarOpen || isMobile) && (
              <div className='flex-1 animate-fadeIn'>
                <p className='text-sm font-medium'>Admin User</p>
                <p className='text-xs text-gray-300'>admin@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden mt-20'>
        {/* Top Header Bar */}
        <div className='bg-white shadow-md p-4 flex items-center gap-4 z-20'>
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleSidebar}
            className='bg-rose-500 hover:bg-rose-600 text-white rounded-lg p-2 shadow-lg transition-all duration-300 hover:scale-110'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>

          <div className='flex-1'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800'>
              Welcome Back! 👋
            </h1>
            <p className='text-xs sm:text-sm text-gray-600 hidden sm:block'>Here's what's happening with your platform today.</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-auto'>
          {/* Stats Grid */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8'>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 150}ms` }}
                className='bg-white rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slideUp group cursor-pointer'
              >
                <div className='flex items-start justify-between mb-2 md:mb-4'>
                  <div className='text-2xl sm:text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-300'>
                    {stat.icon}
                  </div>
                  <span className='text-green-500 text-xs sm:text-sm font-semibold bg-green-50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full'>
                    {stat.change}
                  </span>
                </div>
                <h3 className='text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2'>{stat.label}</h3>
                <p className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800'>{stat.value}</p>
                <div className='mt-2 md:mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden'>
                  <div className='h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-progress'></div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Area Based on Active Menu */}
          <div className='bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 animate-fadeIn'>
            {activeMenu === 1 && (
              <UploadContent/>
            )}

            {activeMenu === 2 && (
              <UserDetail/>
            )}

            {activeMenu === 3 && (
              <div>
                <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3'>
                  <span className='text-2xl sm:text-3xl animate-bounce'>📚</span>
                  All Materials
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                  {[1, 2, 3, 4, 5, 6].map((material, index) => (
                    <div
                      key={material}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className='border-2 border-gray-100 rounded-xl p-4 sm:p-6 hover:border-rose-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slideUp cursor-pointer group'
                    >
                      <div className='text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-125 transition-transform duration-300'>
                        📄
                      </div>
                      <h3 className='font-bold text-sm sm:text-base text-gray-800 mb-2'>Material {material}</h3>
                      <p className='text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4'>
                        Description of study material {material}
                      </p>
                      <div className='flex gap-2'>
                        <button className='flex-1 bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors duration-300 text-xs sm:text-sm'>
                          Edit
                        </button>
                        <button className='flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-xs sm:text-sm'>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }

        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard