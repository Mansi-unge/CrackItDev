import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMedal, FaUserShield, FaStar } from "react-icons/fa";
import { FiEdit, FiKey } from "react-icons/fi";
import dayjs from "dayjs";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [rankData, setRankData] = useState(null);
  const [mcqProgress, setMcqProgress] = useState(null);
  const [codingProgress, setCodingProgress] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  const token = localStorage.getItem("token");

  const mcqTotal = mcqProgress?.solvedMcqQuestions?.length || 0;
  const mcqCorrect = mcqProgress?.solvedMcqQuestions?.filter(q => q.isCorrect).length || 0;
  const mcqAccuracy = mcqTotal ? ((mcqCorrect / mcqTotal) * 100).toFixed(1) : "N/A";

  const codingTotal = codingProgress?.solvedCodingQuestions?.length || 0;
  const codingCorrect = codingProgress?.solvedCodingQuestions?.filter(q => q.isCorrect).length || 0;
  const codingAccuracy = codingTotal ? ((codingCorrect / codingTotal) * 100).toFixed(1) : "N/A";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileRes = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userId = profileRes.data._id;

        const [rankRes, mcqRes, codingRes, activityRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users/rank", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/mcq/progress", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/coding/progress", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5000/api/users/user/${userId}/recent-activity`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(profileRes.data);
        setRankData(rankRes.data.currentUser);
        setMcqProgress(mcqRes.data);
        setCodingProgress(codingRes.data);
        setRecentActivity(activityRes.data.recentActivity);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, [token]);

  if (!user || !rankData) return <div className="text-center py-10">Loading...</div>;

  const { username, email, points, badges, createdAt } = user;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-4">👤 Profile Overview</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-5 border border-gray-200">
        {/* Profile Info */}
        <div className="space-y-1">
          <p><span className="font-semibold">Username:</span> {username}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p>
            <span className="font-semibold">Member Since:</span>{" "}
            {dayjs(createdAt).format("MMM D, YYYY")}
          </p>
        </div>

        {/* Points & Rank */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-blue-50 p-4 rounded-md border">
            <p className="text-sm text-gray-500">📘 MCQ Points</p>
            <p className="text-lg font-bold">{points?.mcq || 0}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md border">
            <p className="text-sm text-gray-500">🚀 Total Points</p>
            <p className="text-lg font-bold">{rankData.totalScore}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-md border">
            <p className="text-sm text-gray-500">🏅 Rank</p>
            <p className="text-lg font-bold">{rankData.rank}</p>
          </div>
        </div>

        {/* Accuracy Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-4">
          <div className="bg-indigo-50 p-4 rounded-md border">
            <p className="text-sm text-gray-500">🎯 MCQ Accuracy</p>
            <p className="text-lg font-bold">{mcqAccuracy}%</p>
            <p className="text-xs text-gray-400">{mcqCorrect} / {mcqTotal} correct</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-md border">
            <p className="text-sm text-gray-500">💻 Coding Accuracy</p>
            <p className="text-lg font-bold">{codingAccuracy}%</p>
            <p className="text-xs text-gray-400">{codingCorrect} / {codingTotal} correct</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold mb-4">🕒 Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <p className="text-gray-500">No recent activity found.</p>
          ) : (
            <ul className="space-y-3 max-h-64 overflow-y-auto">
              {recentActivity.map((act, index) => (
                <li key={index} className="p-3 border rounded-md hover:bg-gray-50">
                  {act.type === "mcq" ? (
                    <div>
                      <p><strong>MCQ Solved</strong> — Question ID: {act.questionId}</p>
                      <p>
                        Result:{" "}
                        <span className={act.isCorrect ? "text-green-600" : "text-red-600"}>
                          {act.isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </p>
                      <p>Selected Option: {act.selectedOption}</p>
                      <p className="text-sm text-gray-400">
                        Answered At: {dayjs(act.answeredAt).format("MMM D, YYYY HH:mm")}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p><strong>Coding Question Submitted</strong> — Question ID: {act.questionId}</p>
                      <p>
                        Result:{" "}
                        <span className={act.isCorrect ? "text-green-600" : "text-red-600"}>
                          {act.isCorrect ? "Passed" : "Failed"}
                        </span>
                      </p>
                      <p>Language: {act.techStack}</p>
                      <p className="text-sm text-gray-400">
                        Submitted At: {dayjs(act.answeredAt).format("MMM D, YYYY HH:mm")}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm hover:bg-gray-100">
            <FiEdit /> Edit Profile
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded-md text-sm hover:bg-red-50">
            <FiKey /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
