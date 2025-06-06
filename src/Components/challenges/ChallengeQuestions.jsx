import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRocket, FaCode, FaSpinner, FaBuilding } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import ChallengeFilterSection from "./ChallengeFilterSection";

const ChallengeQuestions = () => {
  const { tech } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    tech: [tech], // prefill from URL param
    level: [],
    type: ["Coding"],
    company: [],
  });

  useEffect(() => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (filters.tech.length) queryParams.append("tech", filters.tech.join(","));
    if (filters.level.length) queryParams.append("level", filters.level.join(","));
    if (filters.type.length) queryParams.append("type", filters.type.join(","));
    if (filters.company.length) queryParams.append("company", filters.company.join(","));
    queryParams.append("page", 1);
    queryParams.append("pageSize", 15);

    axios
      .get(`http://localhost:5000/api/questions?${queryParams.toString()}`)
      .then((res) => {
        setQuestions(res.data?.questions || []);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="flex">
      {/* Filters Sidebar */}
      <ChallengeFilterSection filters={filters} setFilters={setFilters} />

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700">
          {tech} Challenges
        </h2>

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
            {questions.map((q) => (
              <div
                key={q._id}
                className="bg-white/30 backdrop-blur-md border border-white/20 shadow-md rounded-2xl p-6 space-y-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
                  <FaRocket />
                  <span>{q.title}</span>
                </div>

                <div className="text-sm space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <BiCategory className="text-gray-500" />
                    <span className="font-medium">Topic:</span> {q.topic}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCode className="text-gray-500" />
                    <span className="font-medium">Difficulty:</span> {q.level}
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
                </div>

                <button
                  onClick={() => (window.location.href = `/compiler/${q._id}`)}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  Solve Challenge
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeQuestions;
