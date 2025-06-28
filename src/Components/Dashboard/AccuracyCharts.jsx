// Components/Dashboard/AccuracyCharts.jsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

const AccuracyCharts = ({ mcqData, codingData, dsaData }) => {
  const { correct: mcqCorrect, total: mcqTotal } = mcqData;
  const { correct: codingCorrect, total: codingTotal } = codingData;
  const { correct: dsaCorrect, total: dsaTotal } = dsaData;

  const mcqAccuracy = mcqTotal ? ((mcqCorrect / mcqTotal) * 100).toFixed(1) : "N/A";
  const codingAccuracy = codingTotal ? ((codingCorrect / codingTotal) * 100).toFixed(1) : "N/A";
  const dsaAccuracy = dsaTotal ? ((dsaCorrect / dsaTotal) * 100).toFixed(1) : "N/A";

  const mcqPieData = [
    { name: "Correct", value: mcqCorrect },
    { name: "Incorrect", value: mcqTotal - mcqCorrect },
  ];

  const codingPieData = [
    { name: "Passed", value: codingCorrect },
    { name: "Failed", value: codingTotal - codingCorrect },
  ];

  const dsaPieData = [
    { name: "Correct", value: dsaCorrect },
    { name: "Incorrect", value: dsaTotal - dsaCorrect },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {/* MCQ Chart */}
      <ChartCard
        title="MCQ Accuracy"
        pieData={mcqPieData}
        accuracy={mcqAccuracy}
        correct={mcqCorrect}
        total={mcqTotal}
        color="text-blue-700"
        border="border-blue-300"
      />

      {/* Coding Chart */}
      <ChartCard
        title="Coding Accuracy"
        pieData={codingPieData}
        accuracy={codingAccuracy}
        correct={codingCorrect}
        total={codingTotal}
        color="text-purple-700"
        border="border-purple-300"
      />

      {/* DSA Chart */}
      <ChartCard
        title="DSA Accuracy"
        pieData={dsaPieData}
        accuracy={dsaAccuracy}
        correct={dsaCorrect}
        total={dsaTotal}
        color="text-green-700"
        border="border-green-300"
      />
    </div>
  );
};

const ChartCard = ({ title, pieData, accuracy, correct, total, color, border }) => (
  <div className={`bg-white border-2 ${border} rounded-3xl hover:shadow-xl p-4`}>
    <div className="relative h-40">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            labelLine={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className={`text-2xl font-bold ${color}`}>{accuracy}%</p>
        <p className="text-sm text-gray-600">
          {correct} / {total} correct
        </p>
      </div>
    </div>
    <p className={`text-center text-lg font-medium ${color} mt-2`}>{title}</p>
  </div>
);

export default AccuracyCharts;
