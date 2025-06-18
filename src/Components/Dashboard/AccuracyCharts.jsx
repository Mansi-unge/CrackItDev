// Components/Dashboard/AccuracyCharts.jsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

const AccuracyCharts = ({ mcqData, codingData }) => {
  const { correct: mcqCorrect, total: mcqTotal } = mcqData;
  const { correct: codingCorrect, total: codingTotal } = codingData;

  const mcqAccuracy = mcqTotal ? ((mcqCorrect / mcqTotal) * 100).toFixed(1) : "N/A";
  const codingAccuracy = codingTotal ? ((codingCorrect / codingTotal) * 100).toFixed(1) : "N/A";

  const mcqPieData = [
    { name: "Correct", value: mcqCorrect },
    { name: "Incorrect", value: mcqTotal - mcqCorrect },
  ];

  const codingPieData = [
    { name: "Passed", value: codingCorrect },
    { name: "Failed", value: codingTotal - codingCorrect },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {/* MCQ Accuracy */}
      <div className="bg-white border border-blue-100 rounded-3xl shadow-md hover:shadow-xl p-4">
        <div className="relative h-40">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={mcqPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                labelLine={false}
              >
                {mcqPieData.map((entry, index) => (
                  <Cell key={`mcq-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-bold text-blue-700">{mcqAccuracy}%</p>
            <p className="text-sm text-gray-600">
              {mcqCorrect} / {mcqTotal} correct
            </p>
          </div>
        </div>
        <p className="text-center text-lg font-medium text-blue-700 mt-2">MCQ Accuracy</p>
      </div>

      {/* Coding Accuracy */}
      <div className="bg-white border border-purple-100 rounded-3xl shadow-md hover:shadow-xl p-4">
        <div className="relative h-40">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={codingPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                labelLine={false}
              >
                {codingPieData.map((entry, index) => (
                  <Cell key={`coding-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-bold text-purple-700">{codingAccuracy}%</p>
            <p className="text-sm text-gray-600">
              {codingCorrect} / {codingTotal} passed
            </p>
          </div>
        </div>
        <p className="text-center text-lg font-medium text-purple-700 mt-2">Coding Accuracy</p>
      </div>
    </div>
  );
};

export default AccuracyCharts;
