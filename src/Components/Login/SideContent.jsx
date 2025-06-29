import React from 'react';

const SideContent = ({ isLogin }) => {
  return (
    <div
  className={`hidden md:flex md:w-1/2 flex-col justify-center items-center px-12 py-20 transition-all duration-700 ease-in-out ${
    isLogin ? 'order-1 md:order-1' : 'order-2 md:order-2'
  } bg-gradient-to-tr from-blue-800 via-blue-700 to-blue-800 text-white`}
>

      <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-2xl">CrackIt.dev</h1>
      <p className="text-lg lg:text-xl mb-6 max-w-2xl text-center leading-relaxed drop-shadow-xl font-light">
        Welcome to your all-in-one destination for cracking tech interviews — whether you're a fresher or targeting top-tier companies like FAANG, Microsoft, or startups!
      </p>
      <ul className="text-base lg:text-lg space-y-4 max-w-2xl list-disc list-inside text-left drop-shadow-lg font-medium">
        <li>10,000+ curated theory, MCQs, and coding problems</li>
        <li>Company-specific sets for FAANG, Microsoft & startups</li>
        <li>Daily challenges, streak tracking & progress analytics</li>
        <li>Master DSA, DBMS, OS, CN, System Design</li>
        <li>Practice in real-time with smart online compiler</li>
        <li>Earn badges & track your growth as you learn</li>
      </ul>
      <p className="mt-10 text-center text-sm lg:text-base text-indigo-100 font-light tracking-wide drop-shadow-sm">
        <span className="font-semibold text-white">Start your journey with CrackIt.dev today.</span>
      </p>
    </div>
  );
};

export default SideContent;
