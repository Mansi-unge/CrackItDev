import React from "react";
import dayjs from "dayjs";
import {
  MdPerson,
  MdQuiz,
  MdTrackChanges,
  MdAccessTime,
  MdSecurity,
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
import Sidebar from "../Components/Dashboard/Sidebar";
import ProfileOverview from "../Components/Dashboard/ProfileOverview";

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
  for (let i = 12; i >= 0; i--) {
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
      <Sidebar />

      {/* Main Content - 2 columns with 70/30 split */}
      <main className="flex-1 p-8 overflow-y-auto flex gap-8">
        {/* Left Side - 70% width */}
        <section className="w-[70%] space-y-8">
          {/* Profile Overview Card */}
         <ProfileOverview
            user={user}
            rankData={rankData}
            mcqProgress={mcqProgress}
            codingProgress={codingProgress}
          />


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
        </section>

        {/* Right Side - 30% width */}
        <section className="w-[30%] bg-white rounded-lg shadow p-6 flex flex-col">
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

              <ul className="space-y-3 overflow-y-auto flex-1">
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
                        <p className="text-xs text-gray-500">
                          {dayjs(act.answeredAt).format("MMM D, YYYY h:mm A")}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="flex items-center gap-2 font-semibold">
                          <FaCode className="text-pink-600" />
                          Coding Challenge — Question ID: {act.questionId}
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
                        <p className="text-xs text-gray-500">
                          {dayjs(act.answeredAt).format("MMM D, YYYY h:mm A")}
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
