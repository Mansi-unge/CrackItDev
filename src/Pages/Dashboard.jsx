import React, { useEffect, useState } from "react";
import axios from "axios";
import { GiLaurelsTrophy } from "react-icons/gi";
import { MdSecurity, MdEdit, MdVpnKey, MdQuiz, MdTrackChanges, MdPerson } from "react-icons/md";
import { AiFillStar, AiOutlineCheckCircle } from "react-icons/ai";
import { MdAccessTime } from "react-icons/md";
import { FaRocket, FaMedal, FaRegCheckCircle, FaTimesCircle, FaCode, FaQuestionCircle } from "react-icons/fa";
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
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <MdPerson className="text-blue-600" />
        Profile Overview
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 border border-gray-200">
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
          <div className="bg-blue-50 p-4 rounded-md border flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MdQuiz />
              <span>MCQ Points</span>
            </div>
            <p className="text-lg font-bold">{points?.mcq || 0}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md border flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaRocket />
              <span>Total Points</span>
            </div>
            <p className="text-lg font-bold">{rankData.totalScore}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-md border flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaMedal />
              <span>Rank</span>
            </div>
            <p className="text-lg font-bold">{rankData.rank}</p>
          </div>
        </div>

        {/* Accuracy Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-4">
          <div className="bg-indigo-50 p-4 rounded-md border flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MdTrackChanges />
              <span>MCQ Accuracy</span>
            </div>
            <p className="text-lg font-bold">{mcqAccuracy}%</p>
            <p className="text-xs text-gray-400">{mcqCorrect} / {mcqTotal} correct</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-md border flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <AiOutlineCheckCircle />
              <span>Coding Accuracy</span>
            </div>
            <p className="text-lg font-bold">{codingAccuracy}%</p>
            <p className="text-xs text-gray-400">{codingCorrect} / {codingTotal} correct</p>
          </div>
        </div>

        {/* Earned Badges */}
        <section className="bg-white p-4 rounded shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <GiLaurelsTrophy className="text-yellow-500" />
            Earned Badges
          </h2>
          <div className="flex gap-4 flex-wrap">
            {badges?.bronze && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-200 rounded shadow-sm">
                <GiLaurelsTrophy className="text-yellow-600" />
                <span className="font-medium text-yellow-800">Bronze</span>
              </div>
            )}
            {badges?.silver && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-300 rounded shadow-sm">
                <MdSecurity className="text-gray-700" />
                <span className="font-medium text-gray-900">Silver</span>
              </div>
            )}
            {badges?.golden && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-400 rounded shadow-sm">
                <AiFillStar className="text-yellow-900" />
                <span className="font-medium text-yellow-1000">Golden</span>
              </div>
            )}
            {!badges?.bronze && !badges?.silver && !badges?.golden && (
              <p className="text-sm text-gray-500">No badges earned yet. Start solving challenges!</p>
            )}
          </div>
        </section>

        {/* Recent Activity */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MdAccessTime className="text-gray-600" />
            Recent Activity
          </h3>
          {recentActivity.length === 0 ? (
            <p className="text-gray-500">No recent activity found.</p>
          ) : (
            <ul className="space-y-3 max-h-64 overflow-y-auto">
              {recentActivity.map((act, index) => (
                <li key={index} className="p-3 border rounded-md hover:bg-gray-50 flex flex-col gap-1">
                  {act.type === "mcq" ? (
                    <div>
                      <p className="flex items-center gap-2 font-semibold">
                        <FaQuestionCircle className="text-blue-600" />
                        MCQ Solved — Question ID: {act.questionId}
                      </p>
                      <p>
                        Result:{" "}
                        <span className={act.isCorrect ? "text-green-600" : "text-red-600"}>
                          {act.isCorrect ? (
                            <>
                              <FaRegCheckCircle className="inline" /> Correct
                            </>
                          ) : (
                            <>
                              <FaTimesCircle className="inline" /> Incorrect
                            </>
                          )}
                        </span>
                      </p>
                      <p>Selected Option: {act.selectedOption}</p>
                      <p className="text-sm text-gray-400">
                        Answered At: {dayjs(act.answeredAt).format("MMM D, YYYY HH:mm")}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="flex items-center gap-2 font-semibold">
                        <FaCode className="text-purple-600" />
                        Coding Question Submitted — Question ID: {act.questionId}
                      </p>
                      <p>
                        Result:{" "}
                        <span className={act.isCorrect ? "text-green-600" : "text-red-600"}>
                          {act.isCorrect ? (
                            <>
                              <FaRegCheckCircle className="inline" /> Passed
                            </>
                          ) : (
                            <>
                              <FaTimesCircle className="inline" /> Failed
                            </>
                          )}
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
            <MdEdit /> Edit Profile
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded-md text-sm hover:bg-red-50">
            <MdVpnKey /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;