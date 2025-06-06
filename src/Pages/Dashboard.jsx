import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const bluish = {
  light: "#D0E7FF",
  medium: "#3399FF",
  dark: "#1A4DA0",
  subtleBg: "#F5F9FF",
  text: "#1E3A8A",
};

const statsData = [
  { title: "Daily Challenges Completed", value: "22/30", icon: "📆" },
  { title: "Rapid Fire Questions Solved", value: "185", icon: "⚡" },
  { title: "Quiz Questions Attempted", value: "340", icon: "❓" },
  { title: "Success Rate", value: "86%", icon: "📈" },
];

const quizPieData = [
  { name: "Correct", value: 290 },
  { name: "Incorrect", value: 50 },
];

const COLORS = [bluish.medium, "#bbb"];

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0f2fe] text-slate-800 px-6 py-10 font-inter  mx-auto">


      {/* Welcome */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">Welcome back, Mansi 👋</h1>
        <p className="text-gray-600 text-md">Let’s continue your journey to success!</p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {statsData.map(({ title, value, icon }) => (
          <div
            key={title}
            className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 hover:shadow-md transition duration-200"
          >
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-indigo-600 mt-1">{value}</p>
          </div>
        ))}
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Calendar */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">Daily Challenge Tracker</h2>
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date }) => {
              const day = date.getDate();
              if ([1, 2, 5, 7, 10, 14, 15, 20].includes(day)) {
                return <div className="text-green-500 font-bold text-center">✓</div>;
              }
              if ([3, 4, 6].includes(day)) {
                return <div className="text-red-400 font-bold text-center">✗</div>;
              }
              return null;
            }}
          />
          <p className="mt-4 text-sm text-gray-500">✓ = Completed, ✗ = Missed</p>
        </div>

        {/* Quiz Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-6">Quiz Performance</h2>
          <div className="w-full h-52">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={quizPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {quizPieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-6 space-y-1 text-sm text-gray-700">
            <li><strong>Quizzes Taken:</strong> 20</li>
            <li><strong>Avg Time:</strong> 12 mins</li>
            <li><strong>Tech Stack:</strong> React, JavaScript</li>
          </ul>

          <hr className="my-6" />

          <h2 className="text-xl font-semibold text-indigo-700 mb-4">Rapid Fire</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Questions:</strong> 185</li>
            <li><strong>Fastest Answer:</strong> 8s</li>
            <li><strong>Top Topics:</strong> DSA, DBMS</li>
          </ul>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-indigo-700 mb-6">Your Badges</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Daily Silver", emoji: "🥈", earned: true },
              { name: "Weekly Silver", emoji: "🥈", earned: true },
              { name: "Gold Completion", emoji: "🥇", earned: false },
              { name: "Streak Master", emoji: "🔥", earned: true },
              { name: "Quiz Wizard", emoji: "🧠", earned: false },
            ].map(({ name, emoji, earned }) => (
              <span
                key={name}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${earned ? "bg-indigo-100 text-indigo-700" : "bg-gray-200 text-gray-400"
                  }`}
                title={earned ? name : `${name} (Locked)`}
              >
                {emoji} {name}
              </span>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-auto pt-6">
            Earn more badges by staying consistent 🎯
          </p>
        </div>
      </div>

      {/* Activity Log */}
      <section className="mt-12 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Recent Activity</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>✅ Solved “Recursion Challenge” (Python) - Easy</li>
          <li>❓ Attempted Quiz - JavaScript Intermediate - 7/10 Correct</li>
          <li>⚡ Answered 15 Rapid Fire Questions - DBMS</li>
          <li>🏆 Earned “Daily Silver Badge”</li>
        </ul>
      </section>

    </div>

  );
}

export default Dashboard