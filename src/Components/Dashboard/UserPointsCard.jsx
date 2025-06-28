// components/Dashboard/UserPointsCard.jsx
import React from "react";

const UserPointsCard = ({ points, rankData }) => {
  if (!points || !rankData) return null;

  const cardData = [
    {
      label: "MCQ Points",
      value: points?.mcq || 0,
      bg: "bg-blue-100/60",
      border: "border-2 border-blue-300",
      tooltip: "Points from MCQ challenges",
      id: "mcqPointsTooltip",
    },
    {
      label: "Coding Points",
      value: points?.coding || 0,
      bg: "bg-purple-100/60",
      border: "border-2 border-purple-300",
      tooltip: "Points from coding challenges",
      id: "codingPointsTooltip",
    },
    {
      label: "DSA Points",
      value: points?.dsa || 0,
      bg: "bg-indigo-100/60",
      border: "border-2 border-indigo-300",
      tooltip: "Points from solving DSA problems",
      id: "dsaPointsTooltip",
    },
    {
      label: "Total Points",
      value: rankData.totalScore,
      bg: "bg-green-100/60",
      border: "border-2 border-green-300",
      tooltip: "Combined MCQ + Coding + DSA points",
      id: "totalPointsTooltip",
    },
    {
      label: "Global Rank",
      value: rankData.rank,
      bg: "bg-yellow-100/60",
      border: "border-2 border-yellow-300",
      tooltip: "Your current rank among all users",
      id: "rankTooltip",
    },
  ];

  return (
    <div className="flex flex-wrap gap-7">
      {cardData.map(({ label, value, bg, border, tooltip, id }, i) => (
        <div
          key={i}
          className={`min-w-[140px] ${bg} ${border} flex flex-col items-center justify-center border rounded-2xl text-center hover:shadow-lg hover:scale-[1.03] transition-all cursor-default px-10 py-5`}
          data-tooltip-id={id}
          data-tooltip-content={tooltip}
        >
          <p className="text-xl font-bold text-gray-800">{value}</p>
          <p className="text-md text-gray-600">{label}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPointsCard;
