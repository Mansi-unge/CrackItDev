import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = [
    { name: "Home", href: "/" },
    { name: "Browse Topics", href: "/Topics" },
    { name: "Daily Challenges", href: "/challenges" },
    { name: "Quiz Mode", href: "/Quizes" },
    { name: "Companies", href: "/companies" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm flex flex-col lg:flex-row">
      {/* Top bar for small and medium screens */}
      <div className="flex items-center justify-between px-5 py-3 lg:py-4">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <Logo />
        </a>

        {/* Mobile + Tablet Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Nav & Controls */}
      <div className="hidden lg:flex items-center ms-auto px-6 justify-evenly gap-8">
        <nav>
          <ul className="flex space-x-8">
            {navLink.map((item) => (
              <li
                key={item.name}
                className="font-medium text-black opacity-70 hover:opacity-100 hover:text-indigo-600 hover:font-bold hover:transform hover:scale-110"
              >
                <Link to={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative w-full max-w-60">
          <input
            type="search"
            placeholder="Search your topic..."
            className="border-2 border-gray-300 rounded-3xl py-2 px-12 w-full shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
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

        <Link to="/login">
        Login</Link>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
          Sign up
        </button>
      </div>

      {/* Mobile + Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-4 px-6 pb-4">
          <nav>
            <ul className="flex flex-col space-y-2">
              {navLink.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="block text-black opacity-80 hover:opacity-100 hover:text-indigo-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search your topic..."
              className="border-2 border-gray-300 rounded-3xl py-2 px-12 w-full shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
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

          <div className="flex space-x-4">
            <button className="flex-1 border px-4 py-2 rounded-xl">Login</button>
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl">
              Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
