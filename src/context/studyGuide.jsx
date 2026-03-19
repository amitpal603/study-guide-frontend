import React, { createContext, useState } from 'react'
import axios from "axios"
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export const userAuth = createContext()
function StudyGuide({children}) {

 const [loading , setLoading] = useState(false)
 const {register , handleSubmit , reset} = useForm()
 const navigate = useNavigate()
 const role = sessionStorage.getItem("role")

 //! user register handler
 const registerUser = async (data) => {
  try {
      setLoading(true)
    const response = await axios.post(
      "http://localhost:3000/api/auth/user/register",
      data
    )

    if (response.status === 201) {
      toast.success(response.data.message || "User registered successfully")
      reset()
      navigate("/login-account")
    }

  } catch (error) {

    console.error(error)

    const message =
      error.response?.data?.message || "Registration failed"

    toast.error(message)
  }finally {
    setLoading(false)
  }
}

//? user login register

const loginUser = async (data) => {
   try {
    setLoading(true)

    const res = await axios.post("http://localhost:3000/api/auth/user/login" , data)
    if(res?.status == 200) {
      toast.success(res?.data?.data?.message || "Login Successfully...")
      const {token , role} = res?.data?.data
      sessionStorage.setItem("token" , token)
      sessionStorage.setItem("role" , role)
      navigate("/")
    }
   } catch (error) {
     const message = error.response?.data?.data?.message || "Login failed"
     toast.error(message)
   } finally {
    setLoading(false)
   }
}

// ? logout user handler

const logoutHandler = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api/auth/user/logout")

    if(res.status == 200) {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("role")
      toast.success(res.data?.data?.message || "Logout Successfully...")
    }
  } catch (error) {
    const message = error.response?.data?.data?.message || "Logout failed"
     toast.error(message)
  }

}
 const store = {
    register , handleSubmit , registerUser , loginUser, loading,role,logoutHandler
  }
  return <userAuth.Provider value={store}>{children}</userAuth.Provider>
}

export default StudyGuide
