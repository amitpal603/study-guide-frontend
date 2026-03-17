import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        if(!token) {
        navigate("/login-account")
    }
    },[token])
  return (
    children
  )
}

export default ProtectedRoutes