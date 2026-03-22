import React, { useContext, useState } from 'react'
import { userAuth } from '../../../../context/StudyGuide'

function UploadContent() {
  const { uploadContent } = useContext(userAuth)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState('')

  // ✅ university, course, semester added to formData
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    subjectName: '',
    subjectCode: '',
    university: '',
    course: '',
    semester: ''
  })

  const universities = [
    { id: 1, value: 'mgkvp', label: 'MGKVP' },
    { id: 2, value: 'aktu',  label: 'AKTU'  },
    { id: 3, value: 'du',    label: 'DU'    },
    { id: 4, value: 'bhu',   label: 'BHU'   },
  ]

  const courses = [
    { id: 1, value: 'bca',   label: 'BCA'   },
    { id: 2, value: 'mba',   label: 'MBA'   },
    { id: 3, value: 'mca',   label: 'MCA'   },
    { id: 4, value: 'b.com', label: 'B.COM' },
    { id: 5, value: 'bba',   label: 'BBA'   },
  ]

  const semesters = [1, 2, 3, 4, 5, 6]

  // ✅ Single unified handler for ALL inputs and selects
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsUploading(true)
    setError('')

    try {
      const data = new FormData()
      data.append('pdf',        selectedFile)
      data.append('title',       formData.title)
      data.append('type',        formData.type)
      data.append('subjectName', formData.subjectName)
      data.append('subjectCode', formData.subjectCode)
      data.append('university',  formData.university)  // ✅ from formData directly
      data.append('course',      formData.course)       // ✅ from formData directly
      data.append('semester',    formData.semester)     // ✅ from formData directly

      await uploadContent(data)

      setUploadSuccess(true)
      // Reset everything
      setFormData({
        title: '', type: '', subjectName: '', subjectCode: '',
        university: '', course: '', semester: ''
      })
      setSelectedFile(null)
      setFileName('')

    } catch (err) {
      console.error('Upload failed:', err)
      setError(err?.message || 'Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  // ✅ All 7 fields must be filled
  const isFormValid =
    formData.title &&
    formData.type &&
    formData.subjectName &&
    formData.subjectCode &&
    formData.university &&
    formData.course &&
    formData.semester &&
    selectedFile

  const selectClass = 'w-full px-3 py-2 sm:py-3 text-sm md:text-base border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all duration-300 bg-white'

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

        {/* Card */}
        <div className='bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 animate-slideUp'>
          {uploadSuccess ? (
            <div className='text-center py-8 md:py-12 animate-fadeIn'>
              <div className='inline-block p-4 md:p-6 bg-green-100 rounded-full mb-4 animate-bounce'>
                <span className='text-4xl md:text-5xl lg:text-6xl'>✅</span>
              </div>
              <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mb-2'>
                Upload Successful!
              </h2>
              <p className='text-sm md:text-base text-gray-600 mb-6'>
                Your content has been uploaded successfully.
              </p>
              <button
                onClick={() => setUploadSuccess(false)}
                className='bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:scale-105 transition-all duration-300'
              >
                Upload Another
              </button>
            </div>
          ) : (
            // ✅ Selects moved INSIDE the form so they reset together
            <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>

              {/* University / Course / Semester — all use handleChange */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>

                <div>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                    <span>🏛️</span> University
                  </label>
                  <select name='university' value={formData.university} onChange={handleChange} className={selectClass}>
                    <option value=''>Select University</option>
                    {universities.map(u => (
                      <option key={u.id} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                    <span>🎓</span> Course
                  </label>
                  <select name='course' value={formData.course} onChange={handleChange} className={selectClass}>
                    <option value=''>Select Course</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1'>
                    <span>📅</span> Semester
                  </label>
                  <select name='semester' value={formData.semester} onChange={handleChange} className={selectClass}>
                    <option value=''>Select Semester</option>
                    {semesters.map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Content Title */}
              <div className='transform hover:scale-105 transition-all duration-300'>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  <span>✏️</span> Content Title
                </label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  placeholder='Enter a descriptive title...'
                  className={selectClass}
                />
              </div>

              {/* Subject Name & Subject Code */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'>
                <div className='transform hover:scale-105 transition-all duration-300'>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <span>📖</span> Subject Name
                  </label>
                  <input
                    type='text'
                    name='subjectName'
                    value={formData.subjectName}
                    onChange={handleChange}
                    placeholder='e.g. Mathematics'
                    className={selectClass}
                  />
                </div>
                <div className='transform hover:scale-105 transition-all duration-300'>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <span>🔢</span> Subject Code
                  </label>
                  <input
                    type='text'
                    name='subjectCode'
                    value={formData.subjectCode}
                    onChange={handleChange}
                    placeholder='e.g. MATH101'
                    className={selectClass}
                  />
                </div>
              </div>

              {/* Content Type */}
              <div className='transform hover:scale-105 transition-all duration-300'>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  <span>🗂️</span> Content Type
                </label>
                <input
                  type='text'
                  name='type'
                  value={formData.type}
                  onChange={handleChange}
                  placeholder='e.g. Notes, Video, Assignment...'
                  className={selectClass}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
                  <span>📎</span> Upload File
                </label>
                <input type='file' onChange={handleFileChange} className='hidden' id='file-upload' />
                <label
                  htmlFor='file-upload'
                  className='flex flex-col items-center justify-center w-full h-32 sm:h-36 md:h-40 border-2 border-dashed border-gray-300 rounded-lg md:rounded-xl cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-all duration-300 group'
                >
                  <div className='text-center px-4'>
                    <div className='text-3xl sm:text-4xl md:text-5xl mb-2 group-hover:scale-125 transition-transform duration-300'>
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

              {/* File Selected Indicator */}
              {fileName && (
                <div className='bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-3 animate-fadeIn'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xl animate-bounce flex-shrink-0'>✓</span>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs sm:text-sm font-medium text-gray-700'>File Selected</p>
                      <p className='text-xs text-gray-500 truncate'>{fileName}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className='bg-red-50 border-2 border-red-200 rounded-lg p-3 animate-fadeIn'>
                  <p className='text-xs sm:text-sm text-red-600 font-medium flex items-center gap-2'>
                    <span>⚠️</span> {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type='submit'
                disabled={!isFormValid || isUploading}
                className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg transition-all duration-300 ${
                  !isFormValid || isUploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-rose-500/50 hover:scale-105'
                }`}
              >
                {isUploading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className='flex items-center justify-center gap-2'>
                    <span>Upload Content</span>
                    <span className='text-base md:text-xl'>🚀</span>
                  </div>
                )}
              </button>

            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  )
}

export default UploadContent