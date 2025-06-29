import React, { useState, useEffect } from "react";
import useDsaQuestions from "../Hooks/Dsa/useDsaQuestions";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
const DsaCornerPage = () => {
  const [filters, setFilters] = useState({});
  const { questions, loading } = useDsaQuestions(filters);
  const [totalDsaPoints, setTotalDsaPoints] = useState(null);

  const topics = ["Arrays", "Strings", "Linked List" , "Hashing" , "Stack" , "Queue" ,"Graph", "Tree",  "DP",];

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTotalDsaPoints(data.points?.dsa || 0);
        }
      } catch (err) {
        console.error("Failed to fetch DSA points", err);
      }
    };

    fetchUserPoints();
  }, []);

  return (
    <div className="px-6 py-10 min-h-screen lg:mx-30 ">
      <h1 className="text-3xl font-bold mb-2 text-center ">
        DSA Corner
      </h1>

      {totalDsaPoints !== null && (
        <p className="text-center text-yellow-600 text-lg font-semibold mb-6 flex justify-center items-center gap-2">
           Total DSA Points:{" "}
          <span className="ml-1">{totalDsaPoints}</span>
        </p>
      )}

      {/* Filters */}
      <div className="flex flex-col px-4 md:flex-row gap-4 justify-center items-center mb-6">
        <div className="relative">
          <select
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, difficulty: e.target.value }))
            }
            defaultValue=""
            className="w-sm pr-10 pl-4 py-2 rounded-xl bg-white border border-gray-300 shadow-md text-sm appearance-none focus:outline-none focus:ring-0 "
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <span className="absolute inset-y-0 left-80 flex items-center pointer-events-none">
            <svg
              className="w-12 h-12 ms-4 mt-1 text-gray-500 "
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path d="M8 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <input
          type="text"
          placeholder="Search by topic..."
          className="px-4 py-2 rounded-xl w-sm bg-white  border border-gray-300  shadow-md text-sm focus:ring-0"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, topic: e.target.value }))
          }
        />
      </div>

      {/* Topic Filter Chips */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setFilters((prev) => ({ ...prev, topic }))}
            className="px-4 py-1 text-md font-medium rounded-full text-gray-800 bg-gray-200  shadow-md hover:bg-indigo-600 hover:text-white  transition"
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {Object.entries(filters).map(
          ([key, value]) =>
            value && (
              <span
                key={key}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center font-medium gap-1"
              >
                {key}: {value}
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, [key]: "" }))}
                  className="ml-1 text-md font-bold hover:text-red-600"
                >
                  ✕
                </button>
              </span>
            )
        )}
      </div>

      {/* Questions Grid */}
      {loading ? (
        <div className="text-lg text-gray-600 "><p className="flex-1 my-10 flex flex-col items-center justify-center text-blue-600 text-lg font-medium">
          
                       <FaSpinner className="animate-spin text-6xl mt-40" />
                    </p></div>
      ) : questions.length === 0 ? (
        <p className="text-gray-500 ">No questions found.</p>
      ) : (
        <div className="grid grid-cols-1 shadow">
          {questions.map((q, index) => (
            <Link
              key={q._id}
              to={`/dsa/${q._id}`}
              className={`p-4 transition-all ${
                index % 2 === 0
                  ? "bg-white "
                  : "bg-blue-50"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 ">
                  {q.title}
                </h2>
                <p className="text-md text-gray-600  whitespace-nowrap">
                  {q.topic} &nbsp; | &nbsp;
                  <span
                    className={`font-semibold ${
                      q.difficulty === "Easy"
                        ? "text-green-500"
                        : q.difficulty === "Medium"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DsaCornerPage;
