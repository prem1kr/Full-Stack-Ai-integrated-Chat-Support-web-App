import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/protectedRoutes", {
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

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
