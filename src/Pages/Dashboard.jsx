import React from "react";
import dayjs from "dayjs";
import {
  MdPerson,
  MdQuiz,
  MdTrackChanges,
  MdAccessTime,
  MdEdit,
  MdVpnKey,
  MdSecurity,
  MdHelpOutline,
} from "react-icons/md";
import { GiLaurelsTrophy } from "react-icons/gi";
import { AiFillStar, AiOutlineCheckCircle } from "react-icons/ai";
import {
  FaRocket,
  FaMedal,
  FaRegCheckCircle,
  FaTimesCircle,
  FaCode,
  FaQuestionCircle,
} from "react-icons/fa";
import { useDashboardData } from "../Hooks/Dashboard/useDashboardData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import { Tooltip } from "react-tooltip";

const COLORS = ["#4ade80", "#f87171"]; // Green and Red for Correct/Incorrect

const Dashboard = () => {
  const { user, rankData, mcqProgress, codingProgress, recentActivity } = useDashboardData();

  if (!user || !rankData) return <div className="text-center py-10">Loading...</div>;

  const { username, email, points, badges, createdAt } = user;

  const mcqTotal = mcqProgress?.solvedMcqQuestions?.length || 0;
  const mcqCorrect = mcqProgress?.solvedMcqQuestions?.filter((q) => q.isCorrect).length || 0;
  const mcqIncorrect = mcqTotal - mcqCorrect;
  const mcqAccuracy = mcqTotal ? ((mcqCorrect / mcqTotal) * 100).toFixed(1) : "N/A";

  const codingTotal = codingProgress?.solvedCodingQuestions?.length || 0;
  const codingCorrect = codingProgress?.solvedCodingQuestions?.filter((q) => q.isCorrect).length || 0;
  const codingIncorrect = codingTotal - codingCorrect;
  const codingAccuracy = codingTotal ? ((codingCorrect / codingTotal) * 100).toFixed(1) : "N/A";

  const mcqPieData = [
    { name: "Correct", value: mcqCorrect },
    { name: "Incorrect", value: mcqIncorrect },
  ];
  const codingPieData = [
    { name: "Passed", value: codingCorrect },
    { name: "Failed", value: codingIncorrect },
  ];

  // Simple daily activity count for last 7 days
  const daysCount = {};
  for (let i = 6; i >= 0; i--) {
    const day = dayjs().subtract(i, "day").format("MMM D");
    daysCount[day] = 0;
  }
  recentActivity.forEach((act) => {
    const day = dayjs(act.answeredAt).format("MMM D");
    if (daysCount.hasOwnProperty(day)) daysCount[day]++;
  });
  const activityData = Object.entries(daysCount).map(([date, count]) => ({ date, count }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-blue-700">Dashboard</h1>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <MdPerson /> Profile Overview
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <GiLaurelsTrophy /> Badges
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <MdAccessTime /> Recent Activity
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <MdEdit /> Edit Profile
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <MdVpnKey /> Change Password
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto space-y-8">
        {/* Profile Overview Card */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-3xl font-semibold flex items-center gap-3 mb-4 text-blue-600">
            <MdPerson /> Profile Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Profile Info */}
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Username:</span> {username}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {email}
              </p>
              <p>
                <span className="font-semibold">Member Since:</span>{" "}
                {dayjs(createdAt).format("MMM D, YYYY")}
              </p>
            </div>

            {/* Points & Rank */}
            <div className="grid grid-cols-3 gap-4">
              <div
                className="bg-blue-50 p-4 rounded-md border flex flex-col items-center gap-1 hover:shadow-lg transition"
                data-tooltip-id="mcqPointsTooltip"
                data-tooltip-content="Points earned from MCQ challenges"
              >
                <MdQuiz className="text-xl text-blue-600" />
                <p className="text-sm text-gray-500">MCQ Points</p>
                <p className="text-lg font-bold">{points?.mcq || 0}</p>
                <Tooltip id="mcqPointsTooltip" />
              </div>
              <div
                className="bg-green-50 p-4 rounded-md border flex flex-col items-center gap-1 hover:shadow-lg transition"
                data-tooltip-id="totalPointsTooltip"
                data-tooltip-content="Total points combining MCQ and Coding"
              >
                <FaRocket className="text-xl text-green-600" />
                <p className="text-sm text-gray-500">Total Points</p>
                <p className="text-lg font-bold">{rankData.totalScore}</p>
                <Tooltip id="totalPointsTooltip" />
              </div>
              <div
                className="bg-yellow-50 p-4 rounded-md border flex flex-col items-center gap-1 hover:shadow-lg transition"
                data-tooltip-id="rankTooltip"
                data-tooltip-content="Your global rank among users"
              >
                <FaMedal className="text-xl text-yellow-600" />
                <p className="text-sm text-gray-500">Rank</p>
                <p className="text-lg font-bold">{rankData.rank}</p>
                <Tooltip id="rankTooltip" />
              </div>
            </div>
          </div>

          {/* Accuracy Section with Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-indigo-50 p-6 rounded-md border shadow flex flex-col items-center">
              <MdTrackChanges className="text-3xl text-indigo-600 mb-2" />
              <p className="text-lg font-semibold mb-1">MCQ Accuracy</p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={mcqPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mcqPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-xl font-bold">{mcqAccuracy}%</p>
              <p className="text-sm text-gray-600">
                {mcqCorrect} / {mcqTotal} correct
              </p>
            </div>

            <div className="bg-pink-50 p-6 rounded-md border shadow flex flex-col items-center">
              <AiOutlineCheckCircle className="text-3xl text-pink-600 mb-2" />
              <p className="text-lg font-semibold mb-1">Coding Accuracy</p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={codingPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    fill="#82ca9d"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {codingPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-xl font-bold">{codingAccuracy}%</p>
              <p className="text-sm text-gray-600">
                {codingCorrect} / {codingTotal} correct
              </p>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-yellow-600">
            <GiLaurelsTrophy />
            Earned Badges
          </h2>
          <div className="flex gap-6 flex-wrap">
            {badges?.bronze && (
              <div
                className="flex items-center gap-2 px-5 py-3 bg-yellow-300 rounded shadow-md cursor-default hover:scale-105 transition"
                data-tooltip-id="bronzeTooltip"
                data-tooltip-content="Bronze badge: Starting your journey!"
              >
                <GiLaurelsTrophy className="text-yellow-800 text-2xl" />
                <span className="font-semibold text-yellow-900 text-lg">Bronze</span>
                <Tooltip id="bronzeTooltip" />
              </div>
            )}
            {badges?.silver && (
              <div
                className="flex items-center gap-2 px-5 py-3 bg-gray-400 rounded shadow-md cursor-default hover:scale-105 transition"
                data-tooltip-id="silverTooltip"
                data-tooltip-content="Silver badge: Solid progress made!"
              >
                <MdSecurity className="text-gray-900 text-2xl" />
                <span className="font-semibold text-gray-900 text-lg">Silver</span>
                <Tooltip id="silverTooltip" />
              </div>
            )}
            {badges?.golden && (
              <div
                className="flex items-center gap-2 px-5 py-3 bg-yellow-500 rounded shadow-md cursor-default hover:scale-105 transition"
                data-tooltip-id="goldenTooltip"
                data-tooltip-content="Golden badge: You are a top achiever!"
              >
                <AiFillStar className="text-yellow-900 text-2xl" />
                <span className="font-semibold text-yellow-100 text-lg">Golden</span>
                <Tooltip id="goldenTooltip" />
              </div>
            )}
            {!badges?.bronze && !badges?.silver && !badges?.golden && (
              <p className="text-sm text-gray-500">No badges earned yet. Start solving challenges!</p>
            )}
          </div>
        </section>

        {/* Recent Activity with Bar Chart */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
            <MdAccessTime />
            Recent Activity
          </h2>

          {recentActivity.length === 0 ? (
            <p className="text-gray-500">No recent activity found.</p>
          ) : (
            <>
              {/* Activity Bar Chart */}
              <div className="w-full h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3b82f6" name="Challenges Solved" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <ul className="space-y-3 max-h-96 overflow-y-auto">
                {recentActivity.map((act, index) => (
                  <li
                    key={index}
                    className="p-4 border rounded-md hover:bg-gray-50 flex flex-col gap-1"
                  >
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
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
