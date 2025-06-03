import React from 'react';
import { FaRocket, FaLaptopCode, FaFire } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          CrackIt.dev
        </h1>
        <p className="text-2xl text-blue-700 font-semibold mb-3">
          Tech Interviews, Cracked the Right Way.
        </p>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Practice topic-wise questions, ace rapid-fire rounds, and tailor your prep for FAANG, startups, and everything in between.
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

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-left max-w-4xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">🧠 Topic-Wise Mastery</h3>
            <p className="text-gray-600">
              From HTML to DevOps — curated questions for every tech domain.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">🎯 FAANG-Focused</h3>
            <p className="text-gray-600">
              Practice with questions asked at Google, Meta, Amazon & more.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">⚡ Rapid Fire</h3>
            <p className="text-gray-600">
              Test your speed with timed quizzes and flash rounds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
