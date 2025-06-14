import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TechStackCard = ({ tech, description, Icon, color }) => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countRes = await fetch(`http://localhost:5000/api/coding/count?tech=${tech}`);
        const countData = await countRes.json();
        setTotalQuestions(countData.count);

        const token = localStorage.getItem("token");
        if (token) {
          const progressRes = await fetch("http://localhost:5000/api/coding/progress", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const progressData = await progressRes.json();
          const userSolvedForTech = progressData.solvedCodingQuestions.filter(
            (q) => q.techStack === tech && q.isCorrect
          );
          setSolvedCount(userSolvedForTech.length);
        }

        setIsLoading(false);
      } catch (err) {
        setError("Failed to load progress.");
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tech]);

  const hasGoldBadge = solvedCount === totalQuestions && totalQuestions > 0;
  const progressPercent = totalQuestions ? (solvedCount / totalQuestions) * 100 : 0;

  return (
    <article className="relative bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between overflow-hidden">
      {hasGoldBadge && (
        <div className="absolute bottom-8 -right-16 w-60 transform -rotate-45 z-10 animate-pulse">
          <div className="bg-yellow-400 text-white text-lg font-bold py-1 text-center shadow-md rounded-md">
            🥇 Gold Badge
          </div>
        </div>
      )}

      <header className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full"
            style={{ backgroundColor: `${color}20` }}
            aria-hidden="true"
          >
            <Icon size={20} color={color} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{tech}</h3>
        </div>
        <button
          onClick={() => navigate(`/challenges/${tech.toLowerCase()}`)}
          className="flex items-center gap-2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
          aria-label={`Take ${tech} challenge`}
        >
          Take Challenge
        </button>
      </header>

      <p className="text-gray-600 text-sm leading-relaxed mb-3">{description}</p>

      {isLoading ? (
        <p className="text-xs text-gray-400">Loading progress...</p>
      ) : error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-2 text-xs text-gray-500">
            Progress: {solvedCount}/{totalQuestions} solved
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: color,
                transition: "width 0.5s ease-in-out",
              }}
            />
          </div>
        </>
      )}
    </article>
  );
};

export default TechStackCard;
