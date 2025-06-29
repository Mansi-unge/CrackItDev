import React from "react";
import {
  FaCode,
  FaQuestionCircle,
} from "react-icons/fa";
import dayjs from "dayjs";

const RecentActivitySection = ({ recentActivity }) => {
  return (
    <section className="bg-white backdrop-blur-sm max-h-[300px] sm:max-h-[400px] md:max-h-[274px] overflow-y-auto border-2 rounded-3xl hover:shadow-xl border-blue-300 p-4 mx-3 mt-4 flex flex-col">
      <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2 text-blue-700">
        Recent Activity
      </h2>

      {recentActivity.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent activity found.</p>
      ) : (
        <ul className="space-y-4 flex-1">
          {recentActivity.map((act, index) => (
            <li
              key={index}
              className={`p-3 sm:p-4 rounded-2xl shadow-sm transition-all duration-200 text-sm sm:text-base
                ${act.isCorrect ? "bg-green-50 border border-green-300" : "bg-red-50 border border-red-300"}
              `}
            >
              <div className="flex flex-col gap-1.5">
                {act.type === "mcq" && (
                  <>
                    <div className="flex flex-wrap items-center gap-2 font-semibold text-blue-700">
                      <FaQuestionCircle className="text-base shrink-0" />
                      <span className="break-words">
                        MCQ Solved — <span className="capitalize">{act.techstack || "Unknown"}</span>
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Topic: <span className="capitalize">{act.topic}</span>
                    </p>
                  </>
                )}

                {act.type === "coding" && (
                  <>
                    <div className="flex flex-wrap items-center gap-2 font-semibold text-purple-700">
                      <FaCode className="text-base shrink-0" />
                      <span className="break-words">
                        Coding Challenge — <span className="capitalize">{act.techStack || "Unknown"}</span>
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Topic: <span className="capitalize">{act.topic || "Unknown Topic"}</span>
                    </p>
                  </>
                )}

                {act.type === "dsa" && (
                  <>
                    <div className="flex flex-wrap items-center gap-2 font-semibold text-indigo-700">
                      <FaCode className="text-base shrink-0" />
                      <span className="break-words">
                        DSA Challenge — <span className="capitalize">{act.techStack}</span>
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Topic: <span className="capitalize">{act.topic}</span> | Difficulty:{" "}
                      <span className="capitalize">{act.difficulty}</span>
                    </p>
                  </>
                )}

                <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
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
