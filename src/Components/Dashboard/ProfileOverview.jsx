import React from "react";
import dayjs from "dayjs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Tooltip } from "react-tooltip";

const COLORS = ["#22c55e", "#ef4444"];

const ProfileOverview = ({ user, rankData, mcqProgress, codingProgress }) => {
  if (!user || !rankData) return null;

  const { username, email, points, createdAt } = user;

  const mcqTotal = mcqProgress?.solvedMcqQuestions?.length || 0;
  const mcqCorrect = mcqProgress?.solvedMcqQuestions?.filter(q => q.isCorrect).length || 0;
  const mcqIncorrect = mcqTotal - mcqCorrect;
  const mcqAccuracy = mcqTotal ? ((mcqCorrect / mcqTotal) * 100).toFixed(1) : "N/A";

  const codingTotal = codingProgress?.solvedCodingQuestions?.length || 0;
  const codingCorrect = codingProgress?.solvedCodingQuestions?.filter(q => q.isCorrect).length || 0;
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

  return (
    <section className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 space-y-10 animate-fade-in border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="space-y-2 text-gray-700 px-6 py-4">
          <p><span className="font-semibold">Username:</span> {username}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p><span className="font-semibold">Joined:</span> {dayjs(createdAt).format("MMM D, YYYY")}</p>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-6">
          {[
            {
              label: "MCQ Points",
              value: points?.mcq || 0,
              bg: "bg-blue-100/60",
              border: "border-blue-200",
              tooltip: "Points from MCQ challenges",
              id: "mcqPointsTooltip",
            },
            {
              label: "Total Points",
              value: rankData.totalScore,
              bg: "bg-green-100/60",
              border: "border-green-200",
              tooltip: "Combined MCQ + Coding points",
              id: "totalPointsTooltip",
            },
            {
              label: "Global Rank",
              value: rankData.rank,
              bg: "bg-yellow-100/60",
              border: "border-yellow-200",
              tooltip: "Your current rank among all users",
              id: "rankTooltip",
            },
          ].map(({ label, value, bg, border, tooltip, id }, i) => (
            <div
              key={i}
              className={`min-w-[140px] ${bg} ${border} border rounded-2xl p-5 text-center hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-default`}
              data-tooltip-id={id}
              data-tooltip-content={tooltip}
            >
              <p className="text-xl font-bold text-gray-800">{value}</p>
              <p className="text-sm text-gray-600">{label}</p>
              <Tooltip id={id} />
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* MCQ Accuracy */}
        <div className="bg-white border border-blue-100 rounded-3xl shadow-md hover:shadow-xl p-4">
          <div className="relative h-40">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={mcqPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  labelLine={false}
                >
                  {mcqPieData.map((entry, index) => (
                    <Cell key={`mcq-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-blue-700">{mcqAccuracy}%</p>
              <p className="text-sm text-gray-600">{mcqCorrect} / {mcqTotal} correct</p>
            </div>
          </div>
          <p className="text-center text-lg font-medium text-blue-700 mt-2">MCQ Accuracy</p>
        </div>

        {/* Coding Accuracy */}
        <div className="bg-white border border-purple-100 rounded-3xl shadow-md hover:shadow-xl p-4">
          <div className="relative h-40">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={codingPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  labelLine={false}
                >
                  {codingPieData.map((entry, index) => (
                    <Cell key={`coding-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-purple-600">{codingAccuracy}%</p>
              <p className="text-sm text-gray-600">{codingCorrect} / {codingTotal} correct</p>
            </div>
          </div>
          <p className="text-center text-lg font-medium text-purple-700 mt-2">Coding Accuracy</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;
