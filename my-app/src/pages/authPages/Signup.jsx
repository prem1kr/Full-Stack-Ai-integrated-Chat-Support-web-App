import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatBotImg from '../../assets/logo.png';
import axios from 'axios';

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
      name: "",
	  email: "",
	  password: ""
	});

	const handleChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	}
    
	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
       const res = await axios.post("https://full-stack-ai-powered-chat-support.onrender.com/api/signup", formData);
		   navigate("/login");
		}catch(error){
           alert(error.response?.data?.message || "Signup failed");
		}
	}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
        
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-300 to-purple-400 items-center justify-center p-10">
          <img
            src={ChatBotImg}
            alt="AI Chat Support Illustration"
            className="w-72 h-auto animate-bounce-slow"
          />
        </div>

        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-2">AI Chat Support</h2>
          <p className="text-gray-600 mb-6">Create your account to start chatting smarter.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Prem Kumar"
				name='name'
				value={formData.name}
				onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
				name='email'
                placeholder="premkm016@gmail.com"
				value={formData.email}
				onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
				name='password'
                placeholder="••••••••"
				value={formData.password}
				onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Sign Up
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?{' '}
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

export default Signup;
