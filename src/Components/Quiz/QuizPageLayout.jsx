import React from "react";

const QuizPageLayout = ({ children }) => {
  return (
    <div className="md:flex">
      {children}
    </div>
  );
};

export default QuizPageLayout;
