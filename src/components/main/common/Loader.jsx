import React from 'react'

function Loader() {
  return (
    <div>
       <div className="flex justify-center items-center">
      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    </div>
  )
}

export default Loader
