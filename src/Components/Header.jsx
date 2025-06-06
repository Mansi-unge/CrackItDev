import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Logo from "./Logo";
import navLink from "./NavLink";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("Auth Error:", err.message);
          localStorage.removeItem("token"); // If token invalid, clear it
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload(); // Optional: refresh to reset UI
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm flex flex-col lg:flex-row">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 lg:py-4">
        <Link to="/" className="flex-shrink-0">
          <Logo />
        </Link>

        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center ms-auto px-6 justify-evenly gap-8">
        <nav>
          <ul className="flex space-x-8">
            {navLink.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className="font-medium text-black opacity-70 hover:opacity-100 hover:text-indigo-600 hover:font-bold hover:scale-105 transition"
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="absolute -left-20 hidden group-hover:flex bg-white shadow-xl shadow-gray-400 rounded-md p-6 z-50 min-w-[260px] max-h-[600px] overflow-y-auto overflow-x-hidden flex-wrap gap-6">
                    {item.children.map((section) => (
                      <div key={section.category} className="min-w-[180px]">
                        <h4 className="font-semibold text-gray-800">
                          {section.category}
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {section.topics.map((topic) => (
                            <li key={topic}>
                              <Link
                                to={`/topics/${topic.replace(/\s+/g, "-").toLowerCase()}`}
                                className="block text-gray-700 hover:text-indigo-600 transition"
                              >
                                {topic}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Search */}
        <div className="relative w-full max-w-60">
          <input
            type="search"
            placeholder="Search your topic..."
            className="border-2 border-gray-300 rounded-3xl py-2 px-12 w-full shadow-sm focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        {/* Auth/Profile */}
        {user ? (
          <div className="relative group">
            <FaUserCircle className="w-8 h-8 text-indigo-600 cursor-pointer" />
            <div className="absolute -right-2 top-full mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block z-50">
              <div className="p-4 text-gray-700 border-b border-gray-200">
                Hello, <span className="font-semibold">{user.username}</span>
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" state={{ tab: "login" }}>Login</Link>
            <Link to="/login" state={{ tab: "signup" }}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu (Update similarly if needed) */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-4 px-6 pb-4">
          {/* Mobile nav links */}
          {/* You can also show "Logout" here if user is logged in */}
        </div>
      )}
    </header>
  );
};

export default Header;
