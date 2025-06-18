import React from "react";
import {
  FaRegCheckCircle,
  FaTimesCircle,
  FaCode,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import dayjs from "dayjs";

const RecentActivitySection = ({ recentActivity }) => {
  return (
    <section className="w-[30%] bg-white/80 backdrop-blur border border-gray-200 rounded-3xl shadow p-6 flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
        <MdAccessTime />
        Recent Activity
      </h2>

      {recentActivity.length === 0 ? (
        <p className="text-gray-500">No recent activity found.</p>
      ) : (
        <ul className="space-y-3 overflow-y-auto flex-1">
          {recentActivity.map((act, index) => (
            <li
              key={index}
              className="p-4 border rounded-xl hover:bg-gray-50 transition shadow-sm"
            >
              {act.type === "mcq" ? (
                <div>
                  <p className="flex items-center gap-2 font-semibold text-blue-700">
                    <FaQuestionCircle />
                    MCQ Solved — QID: {act.questionId}
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
                </div>
              ) : (
                <div>
                  <p className="flex items-center gap-2 font-semibold text-pink-600">
                    <FaCode />
                    Coding Challenge — QID: {act.questionId}
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
                </div>
              )}
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
