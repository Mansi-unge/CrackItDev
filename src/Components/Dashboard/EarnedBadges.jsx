import React from "react";
import { GiLaurelsTrophy } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";

const badgeStyles = {
  bronze: {
    bg: "bg-[#fff7eb]",
    border: "border-[#cd7f32]",
    icon: "text-[#cd7f32]",
    text: "text-[#a66c2c]",
  },
  silver: {
    bg: "bg-[#f0f0f0]",
    border: "border-[#c0c0c0]",
    icon: "text-[#a0a0a0]",
    text: "text-[#707070]",
  },
  golden: {
    bg: "bg-[#fffbea]",
    border: "border-[#ffd700]",
    icon: "text-[#f5c518]",
    text: "text-[#d4af37]",
  },
};

const allBadges = [
  { type: "bronze", Icon: GiLaurelsTrophy },
  { type: "silver", Icon: GiLaurelsTrophy },
  { type: "golden", Icon: AiFillStar },
];

const EarnedBadges = ({ badges }) => {
  const earnedTypes = allBadges.filter(({ type }) => badges?.[type] > 0);
  const earnedCount = earnedTypes.length;

  const renderBadge = (type, Icon, isEarned, count, index) => {
    const { bg, border, icon, text } = badgeStyles[type];

    return (
      <div
        key={type}
        className={`relative w-40 h-20 p-2 rounded-2xl transition-all flex flex-col items-center justify-center text-center shadow-md ${
          isEarned
            ? `${bg} border-2 ${border} hover:shadow-xl`
            : "bg-gray-100 border border-gray-300 opacity-50 grayscale"
        }`}
      >
        <Icon className={`text-3xl ${isEarned ? icon : "text-gray-400"}`} />

        <p className={`text-sm font-semibold capitalize ${isEarned ? text : "text-gray-500"}`}>
          {type} {isEarned && count > 1 ? `x${count}` : ""}
        </p>

        {isEarned ? (
          <>
            {/* Show Count as Badge Number */}
            <span className="absolute top-1 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
              x{count}
            </span>

            {/* Shine ring */}
            <span className="absolute -inset-0.5 border-2 border-blue-400 rounded-2xl animate-pulse opacity-30" />
          </>
        ) : (
          <p className="text-[10px] text-gray-400 mt-1">Locked</p>
        )}
      </div>
    );
  };

  return (
    <section className="w-full md:w-1/3 shadow-md bg-white rounded-2xl hover:shadow-xl border-2 border-blue-300 p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-blue-700 font-bold text-lg">Earned Badges</h2>
        <span className="text-xs text-gray-600">
          {earnedCount} / {allBadges.length} badges
        </span>
      </div>

      <div className="flex flex-col gap-3 items-center">
        {allBadges.map(({ type, Icon }) =>
          renderBadge(type, Icon, badges?.[type] > 0, badges?.[type] || 0)
        )}
      </div>
    </section>
  );
};

export default EarnedBadges;
