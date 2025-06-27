import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.5,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const glowAnimation = {
  animate: {
    textShadow: [
      "0 0 5px #facc15",
      "0 0 10px #f59e0b",
      "0 0 20px #facc15",
      "0 0 30px #f59e0b",
    ],
    scale: [1, 1.2, 1],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
  },
};

const AnimatedLogo = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen w-full relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col items-center justify-center text-center overflow-hidden text-white">
      {/* Binary Floating Background */}
      <div className="binary-overlay" />

      {/* Logo */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold flex items-center gap-2 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-pink-500">{"<"}</span>
        <span className="text-indigo-400">crackit</span>
        <motion.span className="text-yellow-400 text-4xl" {...glowAnimation}>
          ⚡
        </motion.span>
        <span className="text-indigo-400">dev</span>
        <span className="text-pink-500">{"/>"}</span>
      </motion.h1>

      {/* Typewriter Tagline */}
      <motion.p
        className="text-lg sm:text-xl mt-4 text-gray-300 font-medium z-10"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <Typewriter
          words={[
            "Tech Interviews. Cracked Right.",
            "Topic-wise Prep. FAANG-Style.",
            "Rapid Fire, Daily Challenges & More.",
          ]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={40}
          deleteSpeed={25}
          delaySpeed={1500}
        />
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-sm sm:text-base mt-3 px-4 max-w-xl text-gray-400 z-10"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        Get ready to crack interviews with real-world coding practice, fast quizzes, and company-focused questions.
      </motion.p>
    </div>
  );
};

export default AnimatedLogo;
