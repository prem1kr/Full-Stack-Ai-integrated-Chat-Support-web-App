import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      if (!email || !password) {
        setIsAdmin(false);
        return;
      }

      try {
        const res = await axios.post("https://ai-chat-app-backend-24sq.onrender.com/api/admin/isAdmin", {
          email,
          password,
        });

        setIsAdmin(res.data.success);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    verifyAdmin();
  }, []);

  if (isAdmin === null) return <p>Loading...</p>;

  return isAdmin ? children : <Navigate to="/adminlogin" replace />;
};

export default AdminProtectedRoute;
