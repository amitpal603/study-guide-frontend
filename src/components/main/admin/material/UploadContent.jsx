import React, { useState } from 'react'

function UploadContent() {
  const [fileName, setFileName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    subjectName: '',
    subjectCode: ''
  })

  const contentTypes = [
    { id: 'pdf', label: 'PDF Document', icon: '📄' },
    { id: 'video', label: 'Video', icon: '🎥' },
    { id: 'audio', label: 'Audio', icon: '🎵' },
    { id: 'image', label: 'Image', icon: '🖼️' },
    { id: 'presentation', label: 'Presentation', icon: '📊' },
    { id: 'other', label: 'Other', icon: '📁' }
  ]

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsUploading(true)

    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)

      setTimeout(() => {
        setUploadSuccess(false)
        setFormData({ title: '', type: '', subjectName: '', subjectCode: '' })
        setFileName('')
      }, 3000)
    }, 2000)
  }

  const isFormValid = formData.title && formData.type && formData.subjectName && formData.subjectCode && fileName

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8'>
      <div className='w-full max-w-2xl'>
        {/* Header */}
        <div className='text-center mb-6 md:mb-8 animate-fadeIn px-2'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2'>
            Upload Content
          </h1>
          <p className='text-sm sm:text-base md:text-lg text-gray-600'>Share your study materials with others</p>
        </div>

        {/* Upload Form Card */}
        <div className='bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 animate-slideUp'>
          {uploadSuccess ? (
            <div className='text-center py-8 md:py-12 animate-fadeIn'>
              <div className='inline-block p-4 md:p-6 bg-green-100 rounded-full mb-4 animate-bounce'>
                <span className='text-4xl md:text-5xl lg:text-6xl'>✅</span>
              </div>
              <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mb-2'>
                Upload Successful!
              </h2>
              <p className='text-sm md:text-base text-gray-600'>Your content has been uploaded successfully.</p>
            </div>
          ) : (
            <div className='space-y-4 md:space-y-6'>

              {/* Content Title */}
              <div className='transform hover:scale-105 transition-all duration-300'>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  <span className='text-base md:text-lg'>✏️</span>
                  <span>Content Title</span>
                </label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder='Enter a descriptive title...'
                  className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm md:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all duration-300'
                />
              </div>

              {/* Subject Name & Subject Code — side by side */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'>
                <div className='transform hover:scale-105 transition-all duration-300'>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <span className='text-base md:text-lg'>📖</span>
                    <span>Subject Name</span>
                  </label>
                  <input
                    type='text'
                    name='subjectName'
                    value={formData.subjectName}
                    onChange={handleInputChange}
                    placeholder='e.g. Mathematics'
                    className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm md:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all duration-300'
                  />
                </div>

                <div className='transform hover:scale-105 transition-all duration-300'>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <span className='text-base md:text-lg'>🔢</span>
                    <span>Subject Code</span>
                  </label>
                  <input
                    type='text'
                    name='subjectCode'
                    value={formData.subjectCode}
                    onChange={handleInputChange}
                    placeholder='e.g. MATH101'
                    className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm md:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all duration-300'
                  />
                </div>
              </div>

              {/* Content Type */}
              <div className='transform hover:scale-105 transition-all duration-300'>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
                  <span className='text-base md:text-lg'>📋</span>
                  <span>Content Type</span>
                </label>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3'>
                  {contentTypes.map((type, index) => (
                    <button
                      key={type.id}
                      type='button'
                      onClick={() => setFormData({ ...formData, type: type.id })}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className={`p-3 sm:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-300 animate-slideInLeft ${
                        formData.type === type.id
                          ? 'border-rose-500 bg-rose-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-rose-300 hover:shadow-md'
                      }`}
                    >
                      <div className='text-xl sm:text-2xl mb-1'>{type.icon}</div>
                      <div className='text-xs font-medium text-gray-700 leading-tight'>{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className='transform hover:scale-105 transition-all duration-300'>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
                  <span className='text-base md:text-lg'>📎</span>
                  <span>Upload File</span>
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    onChange={handleFileChange}
                    className='hidden'
                    id='file-upload'
                  />
                  <label
                    htmlFor='file-upload'
                    className='flex flex-col items-center justify-center w-full h-32 sm:h-36 md:h-40 border-2 border-dashed border-gray-300 rounded-lg md:rounded-xl cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-all duration-300 group'
                  >
                    <div className='text-center px-4'>
                      <div className='text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-3 group-hover:scale-125 transition-transform duration-300'>
                        {fileName ? '📁' : '☁️'}
                      </div>
                      <p className='text-xs sm:text-sm font-medium text-gray-700 mb-1'>
                        {fileName || 'Click to upload or drag and drop'}
                      </p>
                      <p className='text-xs text-gray-500 truncate max-w-full'>
                        {fileName ? fileName : 'PDF, Video, Audio, Image, etc.'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* File Selected Indicator */}
              {fileName && (
                <div className='bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg md:rounded-xl p-3 md:p-4 animate-fadeIn'>
                  <div className='flex items-center gap-2 md:gap-3'>
                    <span className='text-xl md:text-2xl animate-bounce flex-shrink-0'>✓</span>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs sm:text-sm font-medium text-gray-700'>File Selected</p>
                      <p className='text-xs text-gray-500 truncate'>{fileName}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid || isUploading}
                className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg transition-all duration-300 ${
                  !isFormValid || isUploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-rose-500/50 hover:scale-105'
                }`}
              >
                {isUploading ? (
                  <div className='flex items-center justify-center gap-2 md:gap-3'>
                    <div className='w-5 h-5 md:w-6 md:h-6 border-3 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className='flex items-center justify-center gap-2'>
                    <span>Upload Content</span>
                    <span className='text-base md:text-xl'>🚀</span>
                  </div>
                )}
              </button>

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

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default UploadContent