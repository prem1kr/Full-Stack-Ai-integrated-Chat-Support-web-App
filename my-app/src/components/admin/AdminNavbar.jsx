import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { UploadCloud, Eye, Menu, X } from "lucide-react";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset"
];

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleThemeChange = (e) => {
    document.documentElement.setAttribute("data-theme", e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("isAdmin");
    navigate("/adminlogin");
  };

  return (
    <div className="w-full bg-base-100 shadow-md">
      <div className="flex justify-between items-center px-4 py-3">
        
        <div className="flex items-center gap-2">
          <Link to="/admindashboard">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-primary">AI Chat Support</h1>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/upload" className="btn btn-primary btn-sm gap-2">
            <UploadCloud className="w-4 h-4" /> Upload FAQ
          </Link>
          <Link to="/uploadfaq" className="btn btn-secondary btn-sm gap-2">
            <Eye className="w-4 h-4" /> View FAQ
          </Link>
          <Link to="/admindashboard" className="btn btn-secondary btn-sm gap-2">
            <Eye className="w-4 h-4" /> Chat Dashboard
          </Link>
          <button onClick={handleLogout} className="btn btn-sm btn-outline btn-error">
            Logout
          </button>
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

        <button
          className="md:hidden btn btn-ghost btn-square"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-2 p-4 border-t border-base-300 bg-base-100">
          <Link to="/upload" className="btn btn-primary btn-sm gap-2 w-full">
            <UploadCloud className="w-4 h-4" /> Upload FAQ
          </Link>
          <Link to="/uploadfaq" className="btn btn-secondary btn-sm gap-2 w-full">
            <Eye className="w-4 h-4" /> View FAQ
          </Link>
          <Link to="/admindashboard" className="btn btn-secondary btn-sm gap-2 w-full">
            <Eye className="w-4 h-4" /> Chat Dashboard
          </Link>
          <button onClick={handleLogout} className="btn btn-sm btn-outline btn-error w-full">
            Logout
          </button>
          <select
            className="select select-bordered w-full"
            onChange={handleThemeChange}
            defaultValue="dark"
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
