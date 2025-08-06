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

const Navbar = () => {
  const handleThemeChange = (e) => {
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  return (
    <div className="w-full flex justify-between items-center px-6 py-3 bg-base-100 shadow-md">

      <div className="flex items-center gap-2">
        <Link to="/home">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        </Link>
        <h1 className="text-xl font-bold text-primary">AI Chat Support</h1>
      </div>


      <div className="flex items-center gap-4">

        <Link
          to="/home"
          className="btn btn-primary btn-sm"
        >
          Home
        </Link>

      
        <select
          className="select select-bordered max-w-xs"
          onChange={handleThemeChange}
          defaultValue="dark"
        >
          {themes.map((theme) => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </select>

        
      </div>
    </div>
  );
};

export default Navbar;
