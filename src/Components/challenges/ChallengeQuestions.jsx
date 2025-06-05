import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRocket, FaCode, FaSpinner, FaBuilding } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

const ChallengeQuestions = () => {
  const { tech } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/questions?tech=${tech}&type=Coding&page=1&pageSize=15`
      )
      .then((res) => {
        setQuestions(res.data?.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setQuestions([]);
        setLoading(false);
      });
  }, [tech]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-blue-600 text-lg">
        <FaSpinner className="animate-spin text-3xl mb-2" />
        Loading challenges...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-10 flex justify-center items-center gap-3 text-blue-700">
        {tech} Challenges
      </h2>

      {questions.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No challenges found for this tech stack.
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
                {q.company && q.company.length > 0 && (
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
  );
};

export default ChallengeQuestions;
