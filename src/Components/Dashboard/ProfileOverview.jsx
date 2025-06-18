import React from "react";
import dayjs from "dayjs";

const COLORS = ["#22c55e", "#ef4444"];

const ProfileOverview = ({ user, rankData }) => {
  if (!user || !rankData) return null;

  const { username, email, points, createdAt } = user;


  return (
    <section className="space-y-3 px-1 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="space-y-2 text-gray-700 px-6 py-2">
          <p><span className="font-semibold">Username:</span> {username}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p><span className="font-semibold">Joined:</span> {dayjs(createdAt).format("MMM D, YYYY")}</p>
        </div>

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
              className={`min-w-[140px] ${bg} ${border} flex flex-col items-center justify-center border rounded-2xl px-2 text-center hover:shadow-lg hover:scale-[1.03] transition-all cursor-default`}
              data-tooltip-id={id}
              data-tooltip-content={tooltip}
            >
              <p className="text-xl font-bold text-gray-800">{value}</p>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
        </div>
    </section>
  );
};

export default ProfileOverview;
