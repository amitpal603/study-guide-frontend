import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const userAuth = createContext();

function StudyGuide({ children }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [user , setUser] = useState([])
  const [data , setData] = useState([])
  const [url , setUrl] = useState("")
  const navigate = useNavigate();

 
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  
  const API = "http://localhost:3000"; 

  //! REGISTER
  const registerUser = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${API}/api/auth/user/register`,
        data
      );

      if (response.status === 201) {
        toast.success(response.data.message || "User registered");
        reset();
        navigate("/login-account");
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  //! LOGIN
  const loginUser = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post(`${API}/api/auth/user/login`, data);

      if (res.status === 200) {
        const { token, role } = res.data.data;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);

        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  //! LOGOUT
  const logoutHandler = async () => {
    try {
      await axios.post(`${API}/api/auth/user/logout`);

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");

      toast.success("Logout Successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

 const getUser = async () => {
  try {
    if(!token) return
    const res = await axios.get(`${API}/api/auth/user/getAllUser` , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })

    if(res.status == 200) {
      setUser(res.data.user || [])
    }
  } catch (error) {
    console.log(error)
  }
 }

 const uploadContent = async (data) => {
  try {
    if (!token) return;
    const res = await axios.post(
      `${API}/api/auth/admin/upload-pdf`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const message = res?.data?.message || "Upload PDF Successfully";
    toast.success(message);
    contentPdfData()

  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || "Upload failed");
  }
};

const contentPdfData = async () => {
  try {
    if(!token) return

    const res = await axios.get(`${API}/api/auth/user/get/pdf` , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    if(res.status == 200) {
      setData(res.data.data || [])
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteUserHandler = async (delId) => {
  try {
    if(!token) return

    const res = await axios.delete(`${API}/api/auth/user/delete/${delId}` , {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })

    if(res.status == 200) {
      toast.success(res.data?.message || "User Deleted")
      getUser()
    }
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || "Delete failed");
  }
}
useEffect(() => {
  if(token) {
    contentPdfData()
  }
},[])
 useEffect(() => {
  if(token) {
    getUser()
  }
 },[token])

  const store = {
    register,
    handleSubmit,
    registerUser,
    loginUser,
    loading,
    role,
    logoutHandler,
    user,
    uploadContent,
    data,
    url,
    setUrl,
    deleteUserHandler
    
  };

  return <userAuth.Provider value={store}>{children}</userAuth.Provider>;
}

export default StudyGuide;