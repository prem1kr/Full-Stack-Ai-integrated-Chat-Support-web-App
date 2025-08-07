import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatBotImg from '../../assets/logo.png';
import axios from 'axios';

const Login = () => {
  const url = import.meta.env.VITE_AUTH_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://ai-chat-app-backend-24sq.onrender.com/api/login", formData, {
        withCredentials: true,
      });

      if (res.status === 200 && res.data?.user?._id) {
        console.log("Login response:", res.data);

        localStorage.setItem("userId", res.data.user._id);
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(res.data.message || "Login failed");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">

        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-300 to-purple-400 items-center justify-center p-10">
          <img
            src={ChatBotImg}
            alt="AI Chat Support"
            className="w-72 h-auto animate-bounce"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-2">AI Chat Support</h2>
          <p className="text-gray-600 mb-6">Sign in to continue your intelligent conversations.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>

             <p className="text-sm text-center mt-4 text-gray-600">
              if you are a admin ?{' '}
              <Link to="/adminlogin" className="text-indigo-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
