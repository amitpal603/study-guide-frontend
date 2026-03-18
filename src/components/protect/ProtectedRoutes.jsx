import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  useEffect(() => {

    if (!token) {

      if (role === "ADMIN") {
        navigate("/admin-sign-in-study-guide");
      } else {
        navigate("/login-account");
      }

    }

  }, [token, role, navigate]);

  return children;
}

export default ProtectedRoutes;