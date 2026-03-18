import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const token = sessionStorage.getItem("token")
    const role = sessionStorage.getItem("role")
    const navigate = useNavigate()

    useEffect(() => {
        if(!token && role === "USER") {
        navigate("/login-account")
    }
    else if(!token && role === "ADMIN") {
      navigate("/admin-sign-in-study-guide")
    }
    },[token])
  return (
    children
  )
}

export default ProtectedRoutes