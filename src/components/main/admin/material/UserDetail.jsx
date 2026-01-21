import React, { useState } from 'react'
import UserCart from './UserCart'

function UserDetail() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Student', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Teacher', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Student', status: 'Inactive' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.w@example.com', role: 'Admin', status: 'Active' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isOpen , setIsOpen] = useState(false)

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const handleView = (user) => {
    setSelectedUser(user)
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='mb-6 md:mb-8 animate-fadeIn'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-2 md:gap-3'>
            <span className='text-2xl md:text-3xl lg:text-4xl animate-bounce'>👥</span>
            <span>Users Management</span>
          </h2>
          <p className='text-sm md:text-base text-gray-600'>Manage and monitor all platform users</p>
        </div>

        {/* Search and Stats Bar */}
        <div className='bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 animate-slideUp'>
          <div className='flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between'>
            {/* Search Bar */}
            <div className='w-full md:flex-1'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search users by name or email...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-rose-500 focus:outline-none transition-all duration-300 text-sm md:text-base'
                />
                <span className='absolute left-3 top-3 md:top-3.5 text-gray-400 text-lg md:text-xl'>🔍</span>
              </div>
            </div>

            {/* Stats */}
            <div className='flex gap-3 md:gap-4 w-full md:w-auto overflow-x-auto'>
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 px-4 md:px-6 py-3 rounded-lg md:rounded-xl min-w-fit'>
                <p className='text-xs md:text-sm text-gray-600'>Total Users</p>
                <p className='text-xl md:text-2xl font-bold text-blue-600'>{users.length}</p>
              </div>
              <div className='bg-gradient-to-br from-green-50 to-green-100 px-4 md:px-6 py-3 rounded-lg md:rounded-xl min-w-fit'>
                <p className='text-xs md:text-sm text-gray-600'>Active</p>
                <p className='text-xl md:text-2xl font-bold text-green-600'>
                  {users.filter(u => u.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className='space-y-3 md:space-y-4'>
          {filteredUsers.map((user, index) => (
            <div
              key={user.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className='bg-white p-4 md:p-5 lg:p-6 border-2 border-gray-100 rounded-xl md:rounded-2xl hover:border-rose-300 hover:shadow-xl transition-all duration-300 animate-slideInRight'
            >
              {/* Mobile & Desktop Layout */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between'>
                {/* User Info */}
                <div className='flex items-center gap-3 md:gap-4 flex-1 min-w-0'>
                  <div className='w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0'>
                    {user.name.charAt(0)}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1'>
                      <p className='font-semibold md:font-bold text-gray-800 text-base md:text-lg truncate'>
                        {user.name}
                      </p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    <p className='text-xs md:text-sm text-gray-500 truncate'>{user.email}</p>
                    <p className='text-xs text-gray-400 mt-1'>
                      <span className='font-medium'>Role:</span> {user.role}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-2 md:gap-3 w-full sm:w-auto'>
                  <button 
                    onClick={() => {
                        handleView(user)
                        setIsOpen(true)
                    }}
                    className=' hover:cursor-pointer active:scale-95 flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base font-medium'
                  >
                    <span className='hidden sm:inline'>View</span>
                    <span className='sm:hidden'>View</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className=' hover:cursor-pointer active:scale-95 flex-1 sm:flex-none bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base font-medium'
                  >
                    <span className='hidden sm:inline'>Delete</span>
                    <span className='sm:hidden'> Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className='text-center py-12 md:py-16 bg-white rounded-xl md:rounded-2xl shadow-lg'>
              <span className='text-5xl md:text-6xl mb-4 block'>🔍</span>
              <p className='text-lg md:text-xl font-semibold text-gray-600'>No users found</p>
              <p className='text-sm md:text-base text-gray-500 mt-2'>Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
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

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
      `}</style>
      <UserCart isOpen={isOpen} setIsOpen={setIsOpen} user={selectedUser}/>
    </div>
  )
}

export default UserDetail