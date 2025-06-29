import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaSpinner, FaMedal } from "react-icons/fa";
import useChallengeQuestions from "../../Hooks/challenges/useChallengeQuestions";
import ChallengeFilterSection from "./ChallengeFilterSection";

const ChallengeQuestions = () => {
  const { tech } = useParams();
  const {
    filters,
    setFilters,
    loading,
    questions,
    solvedIds,
    badges,
  } = useChallengeQuestions(tech);

  return (
    <div className="flex">
      <ChallengeFilterSection filters={filters} setFilters={setFilters} />

      <main className="flex-1 p-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-700">
          {tech} Challenges
        </h2>

        {/* Badges */}
        <div className="flex justify-center gap-6 mb-6 text-blue-700 font-semibold text-sm">
          <span className="flex items-center gap-1">
            <FaMedal className="text-yellow-500" /> Bronze: {badges?.bronze || 0}
          </span>
          ||
          <span className="flex items-center gap-1">
            <FaMedal className="text-gray-400" /> Silver: {badges?.silver || 0}
          </span>
          ||
          <span className="flex items-center gap-1">
            <FaMedal className="text-yellow-700" /> Golden: {badges?.golden || 0}
          </span>
        </div>

        {/* Loading and Questions */}
        {loading ? (
          <div className="flex-1 my-10 flex flex-col items-center justify-center text-blue-600 text-lg font-medium">
            <FaSpinner className="animate-spin text-6xl mt-40" />
          </div>
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No challenges found.</p>
        ) : (
          <div className="grid grid-cols-1 overflow-hidden">
            {questions
              .slice()
              .sort((a, b) => {
                const aSolved = solvedIds.has(a._id.toString());
                const bSolved = solvedIds.has(b._id.toString());
                return bSolved - aSolved; // Solved (true = 1) first
              })
              .map((q, index) => {
                const isSolved = solvedIds.has(q._id.toString());

                return (
                  <Link
                    key={q._id}
                    to={`/compiler/${q._id}`}
                    className={`px-6 py-4 transition-all ${
                      index % 2 === 0
                        ? "bg-white dark:bg-[#161b22]"
                        : "bg-blue-50 dark:bg-[#add9ef]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
                        {q.title}
                        {isSolved && (
                          <FaMedal
                            title="Challenge Solved"
                            className="text-yellow-500 opacity-70 text-xl"
                          />
                        )}
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-wrap gap-2 items-center">
                        <span>{q.topic}</span>
                        <span className="font-semibold text-xs">
                          |&nbsp;
                          <span
                            className={`${
                              q.level === "Easy"
                                ? "text-green-500"
                                : q.level === "Medium"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {q.level}
                          </span>
                        </span>
                        {q.company?.length > 0 && (
                          <>
                            <span>|</span>
                            <div className="flex gap-1 flex-wrap text-xs font-medium">
                              {q.company.map((comp, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5"
                                >
                                  {comp}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ChallengeQuestions;
