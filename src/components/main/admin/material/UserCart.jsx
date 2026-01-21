import React from "react"

function UserCart({ isOpen, setIsOpen, user }) {
  const userModel = document.getElementById("userCart")
  if (!userModel || !isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-xl font-bold text-gray-800">User Detail</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">
            {user.name}
          </h2>

          <p className="text-gray-600">
            📧 {user.email}
          </p>

          <p className="text-gray-600">
            💼 Role:{" "}
            <span className="font-semibold text-gray-800">
              {user.role}
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className=" hover:scale-95 active:scale-95 hover:cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleUp {
          animation: scaleUp 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

export default UserCart
