import React from "react";
import logo from "../../assets/logo.png"; 
import { Link, useNavigate } from "react-router-dom";
import { UploadCloud, Eye } from "lucide-react";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset"
];

const AdminNavbar = () => {
  const navigate = useNavigate();

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
    <div className="w-full flex justify-between items-center px-6 py-3 bg-base-100 shadow-md">
      <div className="flex items-center gap-2">
        <Link to="/admindashboard">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        </Link>
        <h1 className="text-xl font-bold text-primary">AI Chat Support</h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/upload"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-focus transition-colors duration-200 shadow-md text-sm"
        >
          <UploadCloud className="w-4 h-4" />
          Upload FAQ
        </Link>

        <Link
          to="/uploadfaq"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-white hover:bg-secondary-focus transition-colors duration-200 shadow-md text-sm"
        >
          <Eye className="w-4 h-4" />
          View FAQ
        </Link>

        <Link
          to="/admindashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-white hover:bg-secondary-focus transition-colors duration-200 shadow-md text-sm"
        >
          <Eye className="w-4 h-4" />
          Chat Dashboard
        </Link>

        {/* Logout Button (replaces Home) */}
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-outline btn-error"
        >
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
    </div>
  );
};

export default AdminNavbar;
