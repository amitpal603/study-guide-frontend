import React, { useContext } from 'react'
import { userAuth } from '../../../../context/StudyGuide'
import Loader from "../../../../components/main/common/Loader"
function DeleteContent({isOpen , setIsOpen , del}) {
    const { deletePdfHandler , loading} = useContext(userAuth)
    const deleteModel = document.getElementById("delete")
    if(!deleteModel || !isOpen) return null

    const HandleDelete = async (id) => {
      await deletePdfHandler(id)
        setIsOpen(false)
       
    }
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Delete PDF
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this PDF? This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition active:scale-95 hover:rounded-full"
          >
            Cancel
          </button>

          <button
            onClick={() => HandleDelete(del)}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition active:scale-95 hover:rounded-full"
          >
           {loading ? <Loader/> :"Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteContent
