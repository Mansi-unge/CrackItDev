import React from "react";
import { useParams } from "react-router-dom";
import { FaRocket, FaCode, FaSpinner, FaBuilding, FaMedal } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import ChallengeFilterSection from "./ChallengeFilterSection";
import useChallengeQuestions from "../../Hooks/challenges/useChallengeQuestions";

const ChallengeQuestions = () => {
  const { tech } = useParams();
  const {
    filters,
    setFilters,
    loading,
    questions,
    solvedIds,badges,
  } = useChallengeQuestions(tech);

  return (
    <div className="flex">
      <ChallengeFilterSection filters={filters} setFilters={setFilters} />

      <main className="flex-1 p-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700">
          {tech} Challenges
        </h2>

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


        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-blue-600 text-lg">
            <FaSpinner className="animate-spin text-3xl mb-2" />
            Loading challenges...
          </div>
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No challenges found for the selected filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {questions.map((q) => {
              const isSolved = solvedIds.has(q._id.toString());
              return (
                <article
                  key={q._id}
                  className="relative bg-white/30 backdrop-blur-md border border-white/20 shadow-md rounded-2xl p-6 space-y-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  {isSolved && (
                    <div
                      title="Bronze badge earned"
                      className="absolute top-0 right-2 text-yellow-500 opacity-40"
                    >
                      <FaMedal size={56} />
                    </div>
                  )}

                  <header className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
                    <FaRocket />
                    <h3>{q.title}</h3>
                  </header>

                  <section className="text-sm space-y-2 text-gray-700">
                    <p className="flex items-center gap-2">
                      <BiCategory className="text-gray-500" />
                      <strong>Topic:</strong> {q.topic}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCode className="text-gray-500" />
                      <strong>Difficulty:</strong> {q.level}
                    </p>
                    {q.company?.length > 0 && (
                      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        <FaBuilding className="text-gray-500 min-w-fit" />
                        <div className="flex gap-2 flex-wrap">
                          {q.company.map((comp, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>

                  <button
                    onClick={() => (window.location.href = `/compiler/${q._id}`)}
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-colors"
                  >
                    Solve Challenge
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ChallengeQuestions;
