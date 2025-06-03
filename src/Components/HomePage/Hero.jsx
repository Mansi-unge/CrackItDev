import React from "react";
import { FaRocket, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";

const featureCards = [
  {
    title: "🧠",
    label: "Topic-wise Mastery",
    desc: "From HTML to DevOps — curated questions for every tech domain.",
  },
  {
    title: "🎯",
    label: "FAANG Focused",
    desc: "Practice with questions asked at Google, Meta, Amazon & more.",
  },
  {
    title: "⚡",
    label: "Rapid Fire",
    desc: "Test your speed with timed quizzes and flash rounds.",
  },
];

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -10 },
};

const badgeVariants = {
  rest: { rotate: -45 },
  hover: { rotate: 0 },
};

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-100 via-white to-blue-200 py-16 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <style>{`
      @keyframes pulseGlow {
        0%, 100% {
          text-shadow: 0 0 10px #facc15, 0 0 20px #f59e0b;
          transform: scale(1);
        }
        50% {
          text-shadow: 0 0 25px #facc15, 0 0 40px #f59e0b;
          transform: scale(1.2);
        }
      }
    `}</style>

        <div className="flex justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-semibold flex items-center space-x-1 tracking-wide pb-10">
            <span className="text-pink-600">{"<"}</span>

            <span className="font-extrabold text-indigo-600 ">crackit</span>

            <span
              className="text-yellow-400 text-4xl inline-block"
              style={{ animation: "pulseGlow 1.5s ease-in-out infinite" }}
            >
              ⚡
            </span>

            <span className="text-indigo-600 font-extrabold">dev</span>
            <span className="text-pink-600">{" />"}</span>
          </h1>
        </div>
        <p className="text-2xl text-blue-700 font-semibold mb-3">
          Tech Interviews, Cracked the Right Way.
        </p>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Practice topic-wise questions, ace rapid-fire rounds, and tailor your
          prep for FAANG, startups, and everything in between.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg transition duration-300">
            <FaRocket className="inline mr-2" />
            Start Practicing
          </button>
          <button className="bg-white border border-gray-300 hover:border-gray-500 text-gray-700 px-8 py-3 rounded-full text-lg font-semibold shadow-sm transition duration-300">
            <FaLaptopCode className="inline mr-2" />
            Browse Topics
          </button>
        </div>

        {/* Animated Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-24 max-w-5xl mx-auto">
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardVariants}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative bg-white rounded-xl shadow-xl hover:shadow-2xl p-3 pt-14 transition duration-300 group cursor-pointer"
            >
              {/* Badge container rotates */}
              <motion.div
                variants={badgeVariants}
                transition={{ duration: 0.2 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-22 h-22 bg-blue-600 text-white flex items-center justify-center rounded-md font-bold text-lg shadow-md origin-center"
              >
                <motion.div
                  variants={{
                    rest: { rotate: 45 },
                    hover: { rotate: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center leading-none text-xl"
                >
                  <span>{card.title}</span>
                  <span className="text-sm">{card.label}</span>
                </motion.div>
              </motion.div>

              <p className="text-gray-600 mt-4 text-base">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
