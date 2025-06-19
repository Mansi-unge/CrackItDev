import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import navLink from "../Common/NavLink";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
    toast.success("Logged out successfully");
  };
  return (
    <nav className="w-20 bg-white shadow-md  py-4 ps-6 pe-4 flex flex-col items-center gap-8 sticky top-0 h-screen">
      <h1 className="text-xl font-bold text-blue-700">
        <img src="/fevicon.png" alt="Logo" />
      </h1>

      <ul className="flex flex-col items-center gap-6 text-2xl text-gray-600">
        {navLink.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={index}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-500 text-white rounded-bl-full rounded-tl-full ps-4 pe-6 py-4 flex justify-center items-center"
                    : " flex justify-center items-center hover:bg-blue-500 hover:text-white  rounded-bl-full rounded-tl-full ps-4 pe-6 py-4 transition"
                }
                data-tooltip-id={`nav-${item.name.toLowerCase()}-tooltip`}
              >
                <Icon size={28} />
              </NavLink>
            </li>
          );
        })}
      </ul>

       <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-600 p-3 rounded-full transition flex justify-center items-center"
          data-tooltip-id="nav-logout-tooltip"
        >
          <FiLogOut size={28} />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
