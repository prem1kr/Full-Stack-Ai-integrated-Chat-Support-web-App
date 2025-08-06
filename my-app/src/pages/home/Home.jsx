import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const themes = [ "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset"];

  const [questions, setQuestions] = useState([]); 

  const handleFetchQuestion = async () => {
    try {
      const res = await axios.get("https://full-stack-ai-powered-chat-support.onrender.com/api/uploads");
      console.log(res.data.message || "Question fetched successfully");
      setQuestions(res.data.data); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch question");
    }
  };

  useEffect(() => {
    handleFetchQuestion(); 
  }, []);

  const handleThemeChange = (e) => {
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "https://full-stack-ai-powered-chat-support.onrender.com/api/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
      alert(res.data.message || "Logout successful");
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <img src={logo} alt="Logo" className="w-20 h-15 -mt-10" />
         <br />
           
        <div className="flex items-center gap-4">
          <select
            className="select select-bordered max-w-xs"
            onChange={handleThemeChange}
            defaultValue="dark"
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
          <Link to="/upload">
            <button className="btn btn-primary px-8 rounded-full  ">Upload FAQ</button>
          </Link>
          <button className="btn btn-outline btn-error" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-7rem)]">
        {/* Left Panel */}
      <div className="md:col-span-1 bg-base-100 rounded-box shadow p-4 overflow-y-auto">
       <h2 className="text-2xl font-bold text-primary mb-4">Freq Questions</h2>
       
        <div className="space-y-2">
        {questions.map((item, index) => (
         <div
        key={index}
        className="collapse collapse-arrow border border-base-300 rounded-box"
        >
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-lg font-medium">
          {item.Q || "No question found"}
        </div>
        <div className="collapse-content">
          <p>{item.A || "No answer found"}</p>
          </div>
        </div>
           ))}
       </div>
          </div>


        <div className="md:col-span-3 bg-base-100 rounded-box shadow p-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">AI Chat Support</h1>
          <p className="text-base-content mb-6 text-lg">
            Engage in intelligent conversations powered by AI. Ask anything, anytime.
          </p>
          <Link to="/chatwindow">
            <button className="btn btn-primary px-8 rounded-full">Start Chatting</button>
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default Home;
