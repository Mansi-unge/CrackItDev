import React from "react";
import {
  FaRegCheckCircle,
  FaTimesCircle,
  FaCode,
  FaQuestionCircle,
} from "react-icons/fa";
import dayjs from "dayjs";

const RecentActivitySection = ({ recentActivity }) => {
  return (
    <section className="w-[30%] bg-white backdrop-blur border-2 rounded-3xl hover:shadow-xl border-blue-300 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-blue-700">
        Recent Activity
      </h2>

      {recentActivity.length === 0 ? (
        <p className="text-gray-500">No recent activity found.</p>
      ) : (
      <ul className="space-y-3 overflow-y-auto flex-1">
  {recentActivity.map((act, index) => (
    <li
      key={index}
      className={`px-4 py-3 border border-blue-200 rounded-xl transition shadow-sm hover:bg-opacity-80 ${
        act.isCorrect ? "bg-green-50 border-2 border-green-300" : "bg-red-50 border-2 border-red-300"
      }`}
    >
      {act.type === "mcq" ? (
        <div>
          <p className="flex items-center gap-2 font-semibold text-blue-700">
            <FaQuestionCircle />
            MCQ Solved — <span className="capitalize"> {act.techstack || "Unknown"}</span>
          </p>
          <p className="text-sm text-gray-500">
            Topic: <span className="capitalize">{act.topic}</span>
          </p>
        </div>
      ) : act.type === "coding" ? (
        <div>
          <p className="flex items-center gap-2 font-semibold text-purple-700">
            <FaCode />
            Coding Challenge — <span className="capitalize">{act.techStack || "Unknown"}</span>
          </p>
          <p className="text-sm text-gray-500">
            Topic: <span className="capitalize">{act.topic || "Unknown Topic"}</span>
          </p>
        </div>
      ) : null}

      <p className="text-xs text-gray-500 mt-1">
        {dayjs(act.answeredAt).format("MMM D, YYYY h:mm A")}
      </p>
    </li>
  ))}
</ul>

      )}
    </section>
  );
};

export default RecentActivitySection;
