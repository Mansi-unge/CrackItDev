import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in");
          setLoading(false);
          return;
        }
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 text-lg font-semibold animate-pulse">
        Loading your dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold text-lg">
        {error}
      </div>
    );

  if (!user) return null;

  const {
    username,
    email,
    badges = {},
    points = {},
    solvedMcqQuestions = [],
    solvedCodingQuestions = [],
  } = user;

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 shadow-lg">
        <h2 className="text-2xl font-bold tracking-tight">🏆 CrackIt</h2>
        <nav className="space-y-3 text-sm font-medium">
          <NavLink label="Overview" />
          <NavLink label="Badges" />
          <NavLink label="Points" />
          <NavLink label="Progress" />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {username} 👋</h1>
            <p className="text-gray-500">{email}</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 text-white font-medium rounded-lg shadow">
            Logout
          </button>
        </div>

        {/* Points Section */}
        <SectionGrid>
          <InfoCard
            title="MCQ Points"
            value={points.mcq || 0}
            color="from-blue-500 to-blue-600"
          />
          <InfoCard
            title="Coding Points"
            value={points.coding || 0}
            color="from-green-500 to-green-600"
          />
        </SectionGrid>

        {/* Badges Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Badges</h2>
          <div className="flex gap-6">
            <Badge name="Bronze" earned={badges.bronze} emoji="🥉" />
            <Badge name="Silver" earned={badges.silver} emoji="🥈" />
            <Badge name="Golden" earned={badges.golden} emoji="🥇" />
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Progress</h2>
          <ul className="space-y-3 text-gray-700 text-base">
            <li>✅ Solved MCQs: <strong>{solvedMcqQuestions.length}</strong></li>
            <li>💻 Solved Coding Questions: <strong>{solvedCodingQuestions.length}</strong></li>
          </ul>
        </div>
      </main>
    </div>
  );
};

// Navigation Link Component
const NavLink = ({ label }) => (
  <a
    href="#"
    className="block px-2 py-1 rounded hover:bg-gray-800 hover:text-blue-400 transition"
  >
    {label}
  </a>
);

// Card Component
const InfoCard = ({ title, value, color }) => (
  <div
    className={`bg-gradient-to-r ${color} text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition`}
  >
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-4xl font-bold mt-2">{value}</p>
  </div>
);

// Badge Component
const Badge = ({ name, earned, emoji }) => {
  const activeStyle = "text-green-600 animate-pulse";
  const lockedStyle = "text-gray-400 grayscale";
  return (
    <div className={`flex flex-col items-center ${earned ? activeStyle : lockedStyle}`}>
      <span className="text-4xl">{emoji}</span>
      <span className="mt-2 font-semibold">{earned ? `Earned ${name}` : `${name} Locked`}</span>
    </div>
  );
};

// Section Grid Wrapper
const SectionGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">{children}</div>
);

export default Dashboard;
