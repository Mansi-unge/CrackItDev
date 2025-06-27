  import React from "react";
  import { FaCalendarCheck, FaFire, FaBuilding, FaQuestion } from "react-icons/fa";

  const ImportanceData = [
    {
      icon: <FaCalendarCheck className="text-blue-700 text-2xl" />,
      title: "Daily Challenge",
      info: "New coding challenges every day to keep your skills sharp",
      bgColor: "bg-blue-100",
    },
    {
      icon: <FaFire className="text-red-500 text-2xl" />,
      title: "Most Asked Questions",
      info: "Curated collection of frequently asked interview questions",
      bgColor: "bg-red-100",
    },
    {
      icon: <FaBuilding className="text-green-600 text-2xl" />,
      title: "Company-Wise Prep",
      info: "Targeted preparation for top tech companies",
      bgColor: "bg-green-100",
    },
    {
      icon: <FaQuestion className="text-purple-600 text-2xl" />,
      title: "Quiz Mode",
      info: "Test your knowledge with interactive quizzes",
      bgColor: "bg-purple-100"
    },
  ];

  const Importance = () => {
    return (
      <section className="bg-gradient-to-br from-blue-100 via-white to-blue-200 py-10 ">
        <div className="text-center mb-10 px-4">
          <h1 className="text-3xl font-bold text-gray-800">Why {"<CrackIt.dev />"} Stands Out</h1>
          <p className="text-gray-600 mt-2">
            Explore the core features designed to boost your interview prep journey.
          </p>
        </div>

        <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {ImportanceData.map((item, index) => (
            <div
              key={index}
              role="region"
              tabIndex={0}
              aria-label={item.title}
              className="bg-white shadow-md rounded-2xl p-4  flex flex-col hover:shadow-xl transition hover:scale-105 duration-300"
            >
              <span
                className={`mb-1 w-14 h-14 flex items-center justify-center rounded-full ${item.bgColor} `}
              >
                {item.icon}
              </span>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.info}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  export default Importance;
