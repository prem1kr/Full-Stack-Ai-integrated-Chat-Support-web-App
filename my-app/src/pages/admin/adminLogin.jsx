import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatBotImg from "../../assets/logo.png"; // Replace with actual image path
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://ai-chat-app-backend-24sq.onrender.com/api/admin/isAdmin", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("isAdmin", true);
        navigate("/admindashboard");
      } else {
        alert("Invalid admin credentials");
      }
    } catch (err) {
      alert("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">

        {/* Left Illustration */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-300 to-purple-400 items-center justify-center p-10">
          <img
            src={ChatBotImg}
            alt="AI Chat Support"
            className="w-72 h-auto animate-bounce"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600 mb-6">Sign in with authorized admin credentials.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? 'Logging in...' : 'Login as Admin'}
            </button>
            <p className="text-sm text-center mt-4 text-gray-600">
              if you are a user?{' '}
              <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
