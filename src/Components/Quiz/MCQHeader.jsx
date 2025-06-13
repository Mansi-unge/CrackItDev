const  MCQHeader = ({ points }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Quiz - MCQ Questions
      </h1>
      <div className="mb-6 text-center text-lg font-semibold text-indigo-700">
        Your MCQ Points: {points}
      </div>
    </>
  );
}

export default MCQHeader