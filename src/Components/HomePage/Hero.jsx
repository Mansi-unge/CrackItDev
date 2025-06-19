import React from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaLaptopCode, FaBrain, FaBullseye, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

const featureCards = [
  {
    icon: <FaBrain size={28} />,
    label: "Topic-wise Mastery",
    desc: "From HTML to DevOps — curated questions for every tech domain.",
  },
  {
    icon: <FaBullseye size={28} />,
    label: "FAANG Focused",
    desc: "Practice with questions asked at Google, Meta, Amazon & more.",
  },
  {
    icon: <FaBolt size={28} />,
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
    <section className="bg-gradient-to-br from-blue-100 via-white to-blue-200 py-12 sm:py-16 px-4 sm:px-6 md:px-10 text-center">
      <div className="max-w-7xl mx-auto">
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

        {/* Logo Text */}
        <div className="flex justify-center">
          <h1 className="text-5xl md:text-6xl font-semibold flex flex-wrap items-center justify-center gap-2 tracking-wide pb-4 sm:pb-10">
            <span className="text-pink-600">{"<"}</span>
            <span className="font-extrabold text-indigo-600">crackit</span>
            <span
              className="text-yellow-400 text-3xl sm:text-4xl md:text-5xl"
              style={{ animation: "pulseGlow 1.5s ease-in-out infinite" }}
            >
              ⚡
            </span>
            <span className="text-indigo-600 font-extrabold">dev</span>
            <span className="text-pink-600">{"/>"}</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-blue-700 font-semibold mb-3">
          Tech Interviews, Cracked the Right Way.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12">
          Practice topic-wise questions, ace rapid-fire rounds, and tailor your prep for FAANG, startups, and everything in between.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-24">
          <Link to="/topics" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base sm:text-lg font-bold shadow-lg transition duration-300 w-full sm:w-auto">
            <FaRocket className="inline mr-2" />
            Start Practicing
          </Link>
          <button className="bg-white border border-gray-300 hover:border-gray-500 text-gray-700 px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-sm transition duration-300 w-full sm:w-auto">
            <FaLaptopCode className="inline mr-2" />
            Browse Topics
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18 md:gap-10 max-w-6xl mx-auto">
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardVariants}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative bg-white rounded-xl shadow-xl hover:shadow-2xl p-4 pt-16 transition duration-300 group cursor-pointer"
            >
              <motion.div
                variants={badgeVariants}
                transition={{ duration: 0.3 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-600 text-white flex flex-col items-center justify-center rounded-lg font-bold text-lg shadow-md origin-center"
              >
                <motion.div
                  variants={{ rest: { rotate: 45 }, hover: { rotate: 0 } }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-xl leading-tight"
                >
                  {card.icon}
                  <span className="text-xs mt-1 text-center px-1">{card.label}</span>
                </motion.div>
              </motion.div>
              <p className="text-gray-600 text-sm sm:text-base mt-6">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
