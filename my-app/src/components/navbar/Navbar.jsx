import React from "react";
import logo from "../../assets/logo.png"; 
import { Link } from "react-router-dom";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset"
];

const Navbar = ({ onMenuClick }) => {
  const handleThemeChange = (e) => {
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  return (
    <div className="w-full flex justify-between items-center px-4 sm:px-6 py-3 bg-base-100 shadow-md">
      
      <div className="flex items-center gap-3">
        <button
          className="md:hidden btn btn-ghost btn-square"
          onClick={onMenuClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link to="/home" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-lg sm:text-xl font-bold text-primary whitespace-nowrap">
            AI Chat
          </h1>
        </Link>
      </div>

   
<div className="flex items-center gap-2 sm:gap-4">
  <Link to="/home" className="btn btn-primary btn-sm">
    Home
  </Link>

  <select
    className="select select-bordered max-w-[120px] sm:max-w-xs"
    onChange={handleThemeChange}
    defaultValue="dark"
  >
    {themes.map((theme) => (
      <option key={theme} value={theme}>
        {theme}
      </option>
    ))}
  </select>
</div>

    </div>
  );
};

export default Navbar;
