import React, { useState } from "react";
import { Link } from "react-router-dom";
import fullTechData from "./TechStackData";
import { FaArrowRightLong } from "react-icons/fa6";

const TechStack = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="flex justify-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Master Your Stack</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {fullTechData.slice(0, visibleCount).map((item, index) => {
          const IconComponent = item.icon; // get icon component
          return (
            <div
              key={index}
              className="shadow-xl bg-white p-4 rounded-2xl hover:shadow-2xl transition transform hover:-translate-y-2 duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                {/* Render icon component with dynamic color */}
                <div>
                  <IconComponent className={`text-4xl ${item.color}`} />
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-xl">
                    {item.type1}
                  </span>
                  <span className="px-3 py-1 text-xs font-bold bg-yellow-100 text-yellow-700 rounded-xl">
                    {item.type2}
                  </span>
                  <span className="px-3 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-xl">
                    {item.type3}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4 text-sm">{item.info}</p>
              <div className="flex justify-between items-center gap-1.5 mt-auto py-3">
                <Link
                  to={`/topics?tech=${item.name}&type=Theory`}
                  className="flex-1 flex justify-center items-center px-2 text-sm font-semibold text-blue-700 bg-blue-100 py-1 rounded-xl hover:bg-blue-200 transition"
                >
                  Interview Ques
                </Link>


                <Link
                  to={`/challenges/${item.name}`}  
                  className="flex-1 flex justify-center items-center text-sm font-semibold text-green-700 bg-green-100 py-1 rounded-xl hover:bg-green-200 transition"
                >
                  Code 
                </Link>


               <Link
  to={`/quiz/${item.name}`} 
  className="flex-1 flex justify-center items-center text-sm font-semibold text-purple-700 bg-purple-100 py-1 rounded-xl hover:bg-purple-200 transition"
>
  Quiz
</Link>
              </div>


            </div>
          );
        })}
      </div>

      {visibleCount < fullTechData.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default TechStack;
