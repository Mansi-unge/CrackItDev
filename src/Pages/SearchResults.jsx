import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { tech } = useParams();
  const [theoryQues, setTheoryQues] = useState([]);
  const [codingQues, setCodingQues] = useState([]);
  const [quizQues, setQuizQues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
  try {
    const [theoryRes, codingRes, quizRes] = await Promise.all([
      axios.get(`http://localhost:5000/api/theory/questions?tech=${tech}`),
      axios.get(`http://localhost:5000/api/coding?tech=${tech}`),
      axios.get(`http://localhost:5000/api/quiz/?tech=${tech}`),
    ]);

    setTheoryQues(theoryRes.data.questions || []);
    setCodingQues(codingRes.data.questions || []);
    setQuizQues(quizRes.data.questions || []);
  } catch (err) {
    console.error("Error fetching questions:", err);
  }
};


    fetchData();
  }, [tech]);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Results for: <span className="text-gray-800">{tech}</span>
      </h2>

      {/* Theory / Interview Questions */}
      {theoryQues.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">Interview Questions</h3>
          <ul className="list-disc pl-6">
            {theoryQues.map((q) => (
              <li key={q._id}>{q.question}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Coding Questions */}
      {codingQues.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-green-700 mb-3">Coding Challenges</h3>
          <ul className="list-disc pl-6">
            {codingQues.map((q) => (
              <li key={q._id}>{q.title}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Quiz Questions */}
      {quizQues.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Quiz Questions</h3>
          <ul className="list-disc pl-6">
            {quizQues.map((q) => (
              <li key={q._id}>{q.question}</li>
            ))}
          </ul>
        </div>
      )}

      {theoryQues.length === 0 && codingQues.length === 0 && quizQues.length === 0 && (
        <p className="text-gray-600 text-center">No results found for this tech stack.</p>
      )}
    </div>
  );
};

export default SearchResults;
