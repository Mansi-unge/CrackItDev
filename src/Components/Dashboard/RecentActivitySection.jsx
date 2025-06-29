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
    <section className="bg-white backdrop-blur max-h-[300px] sm:max-h-[400px] md:max-h-[274px] overflow-y-auto border-2 rounded-3xl hover:shadow-xl border-blue-300 p-3 sm:p-4 flex flex-col">
      <h2 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2 text-blue-700">
        Recent Activity
      </h2>

      {recentActivity.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent activity found.</p>
      ) : (
        <ul className="space-y-3 overflow-y-auto flex-1">
          {recentActivity.map((act, index) => (
            <li
              key={index}
              className={`px-3 py-3 sm:px-4 sm:py-3 border rounded-xl transition shadow-sm text-sm sm:text-base
                ${act.isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}
              `}
            >
              <div className="flex flex-col gap-1 sm:gap-0.5">
                {act.type === "mcq" ? (
                  <>
                    <p className="flex flex-wrap items-center gap-2 font-semibold text-blue-700">
                      <FaQuestionCircle className="text-base sm:text-lg" />
                      MCQ Solved —
                      <span className="capitalize">{act.techstack || "Unknown"}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Topic: <span className="capitalize">{act.topic}</span>
                    </p>
                  </>
                ) : act.type === "coding" ? (
                  <>
                    <p className="flex flex-wrap items-center gap-2 font-semibold text-purple-700">
                      <FaCode className="text-base sm:text-lg" />
                      Coding Challenge —
                      <span className="capitalize">{act.techStack || "Unknown"}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Topic: <span className="capitalize">{act.topic || "Unknown Topic"}</span>
                    </p>
                  </>
                ) : act.type === "dsa" ? (
                  <>
                    <p className="flex flex-wrap items-center gap-2 font-semibold text-indigo-700">
                      <FaCode className="text-base sm:text-lg" />
                      DSA Challenge —
                      <span className="capitalize">{act.techStack}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Topic: <span className="capitalize">{act.topic}</span> | Difficulty:{" "}
                      <span className="capitalize">{act.difficulty}</span>
                    </p>
                  </>
                ) : null}
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  {dayjs(act.answeredAt).format("MMM D, YYYY h:mm A")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentActivitySection;
