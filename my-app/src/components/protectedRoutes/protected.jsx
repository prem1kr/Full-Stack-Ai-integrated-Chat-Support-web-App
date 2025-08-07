import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect( async  () => {

    const res = await axios.get("https://ai-chat-app-backend-24sq.onrender.com/api/protectedRoutes", {
      withCredentials: true
    })
      .then((res) => {
        setIsAuthenticated(true);
      })
      .catch((err) => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
