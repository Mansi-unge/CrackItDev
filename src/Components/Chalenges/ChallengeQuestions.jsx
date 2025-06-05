import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChallengeQuestions = () => {
  const { tech } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/questions?tech=${tech}&type=Coding&page=1&pageSize=15`)
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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold capitalize">{tech} Challenges</h2>
      {questions.length === 0 ? (
        <p className="text-gray-600">No questions found for this tech stack.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q._id}
            className="bg-white p-4 border rounded-xl shadow-md space-y-2"
          >
            <h3 className="text-lg font-semibold">{q.title}</h3>
            <p className="text-sm text-gray-500">Topic: {q.topic}</p>
            <p className="text-sm">Difficulty: {q.level}</p>
            <p className="text-sm">
              Companies: {q.company && q.company.join(", ")}
            </p>
            <button
              onClick={() => (window.location.href = `/compiler/${q._id}`)}
              className="bg-green-600 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-700"
            >
              Solve Challenge
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ChallengeQuestions;
