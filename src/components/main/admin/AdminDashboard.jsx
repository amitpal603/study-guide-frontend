import React, { useState } from 'react'
import UploadContent from './material/UploadContent'

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-100 to-pink-50 flex'>
      {/* Left Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } bg-gradient-to-b from-[#355c7d] to-[#2a4a5e] text-white transition-all duration-500 ease-in-out shadow-2xl relative flex-shrink-0`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='absolute -right-4 top-8 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 z-10'
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`}
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>

        {/* Sidebar Header */}
        <div className='p-6 border-b border-white/20 mt-20'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center text-xl animate-pulse'>
              👨‍💼
            </div>
            {isSidebarOpen && (
              <div className='animate-fadeIn'>
                <h2 className='text-xl font-bold'>Admin Panel</h2>
                <p className='text-xs text-gray-300'>Manage Everything</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className='p-4 space-y-2'>
          {adminMenu.map((menu, index) => (
            <button
              key={menu.id}
              onClick={() => setActiveMenu(menu.id)}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 flex items-center gap-4 group hover:scale-105 animate-slideInLeft ${
                activeMenu === menu.id
                  ? 'bg-rose-500 shadow-lg shadow-rose-500/50'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className='text-2xl group-hover:scale-125 transition-transform duration-300'>
                {menu.icon}
              </span>
              {isSidebarOpen && (
                <div className='flex-1'>
                  <span className='font-medium text-sm'>{menu.title}</span>
                  <div className={`h-0.5 w-0 group-hover:w-full bg-white/50 transition-all duration-500 mt-1`}></div>
                </div>
              )}
              {activeMenu === menu.id && (
                <span className='w-2 h-2 bg-white rounded-full animate-ping'></span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-white/20'>
          <div className='flex items-center gap-3 px-2'>
            <div className='w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-lg'>
              A
            </div>
            {isSidebarOpen && (
              <div className='flex-1 animate-fadeIn'>
                <p className='text-sm font-medium'>Admin User</p>
                <p className='text-xs text-gray-300'>admin@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className='flex-1 p-8 overflow-auto mt-20'>
        {/* Header */}
        <div className='mb-8 animate-fadeIn'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            Welcome Back! 👋
          </h1>
          <p className='text-gray-600'>Here's what's happening with your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 150}ms` }}
              className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slideUp group cursor-pointer'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='text-4xl group-hover:scale-125 transition-transform duration-300'>
                  {stat.icon}
                </div>
                <span className='text-green-500 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full'>
                  {stat.change}
                </span>
              </div>
              <h3 className='text-gray-600 text-sm mb-2'>{stat.label}</h3>
              <p className='text-3xl font-bold text-gray-800'>{stat.value}</p>
              <div className='mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden'>
                <div className='h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-progress'></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area Based on Active Menu */}
        <div className='bg-white rounded-2xl shadow-lg p-8 animate-fadeIn'>
          {activeMenu === 1 && (
            <UploadContent/>
          )}

          {activeMenu === 2 && (
            <div>
              <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
                <span className='text-3xl animate-bounce'>👥</span>
                Users Management
              </h2>
              <div className='space-y-3'>
                {[1, 2, 3, 4].map((user, index) => (
                  <div
                    key={user}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className='flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-rose-300 hover:shadow-lg transition-all duration-300 animate-slideInRight'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold'>
                        U{user}
                      </div>
                      <div>
                        <p className='font-medium text-gray-800'>User Name {user}</p>
                        <p className='text-sm text-gray-500'>user{user}@example.com</p>
                      </div>
                    </div>
                    <button className='bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors duration-300 hover:scale-105'>
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 3 && (
            <div>
              <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
                <span className='text-3xl animate-bounce'>📚</span>
                All Materials
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[1, 2, 3, 4, 5, 6].map((material, index) => (
                  <div
                    key={material}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className='border-2 border-gray-100 rounded-xl p-6 hover:border-rose-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slideUp cursor-pointer group'
                  >
                    <div className='text-4xl mb-4 group-hover:scale-125 transition-transform duration-300'>
                      📄
                    </div>
                    <h3 className='font-bold text-gray-800 mb-2'>Material {material}</h3>
                    <p className='text-sm text-gray-600 mb-4'>
                      Description of study material {material}
                    </p>
                    <div className='flex gap-2'>
                      <button className='flex-1 bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors duration-300 text-sm'>
                        Edit
                      </button>
                      <button className='flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm'>
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