import React from "react";

const Logo = () => (
  <>
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

    <h1 className="text-2xl sm:text-2xl md:text-4xl font-semibold flex items-center space-x-1 tracking-wide">
      <span className="text-pink-600">{'<'}</span>

      <span className="font-bold text-indigo-600 ">
        crackit
      </span>

      <span
        className="text-yellow-400 text-3xl lg:text-4xl inline-block"
        style={{ animation: "pulseGlow 1.5s ease-in-out infinite" }}
      >
      ⚡
      </span>

      <span className="text-indigo-600 font-bold">dev</span>
      <span className="text-pink-600">{' />'}</span>
    </h1>
  </>
);

export default Logo;
