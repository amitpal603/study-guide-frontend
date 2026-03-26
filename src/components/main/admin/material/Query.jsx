import React, { useContext, useState } from 'react'
import axios from 'axios'
import { userAuth } from '../../../../context/StudyGuide'

function Query() {
const {setData , contentPdfData} = useContext(userAuth)
  const [formData, setFromData] = useState({
    university: '',
    course: '',
    semester: '',
    subject: ''
  })


  

  const universities = [
    { id: 1, value: 'mgkvp', label: 'MGKVP' },
    { id: 2, value: 'aktu', label: 'AKTU' },
    { id: 3, value: 'du', label: 'DU' },
    { id: 4, value: 'bhu', label: 'BHU' },
  ]

  const courses = [
    { id: 1, value: 'bca', label: 'BCA' },
    { id: 2, value: 'mba', label: 'MBA' },
    { id: 3, value: 'mca', label: 'MCA' },
    { id: 4, value: 'b.com', label: 'B.COM' },
    { id: 5, value: 'bba', label: 'BBA' },
  ]

  const semesters = [1, 2, 3, 4, 5, 6]

  const handleChange = (e) => {
    setFromData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await contentPdfData(formData)
      setFromData({university : "" , course : "" , semester  : "" , subject : ""})
    } catch (error) {
      console.log(error.message)
    }
  }

  const inputClass =
    'w-full px-3 py-3 text-sm md:text-base border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all duration-300 bg-white'

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-5">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <select name="university" value={formData.university} onChange={handleChange} className={inputClass}>
          <option value="">Select University</option>
          {universities.map(u => (
            <option key={u.id} value={u.value}>{u.label}</option>
          ))}
        </select>

        <select name="course" value={formData.course} onChange={handleChange} className={inputClass}>
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c.id} value={c.value}>{c.label}</option>
          ))}
        </select>

        <select name="semester" value={formData.semester} onChange={handleChange} className={inputClass}>
          <option value="">Select Semester</option>
          {semesters.map(s => (
            <option key={s} value={s}>Semester {s}</option>
          ))}
        </select>

        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={inputClass}
          placeholder="Enter subject"
        />

      </div>

      <div className="flex justify-end">
        <button className="px-6 py-3 bg-rose-500 text-white rounded-xl">
          🔍 Search
        </button>
      </div>

    </form>
  )
}

export default Query