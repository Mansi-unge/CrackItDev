import React from "react";
import { GiLaurelsTrophy } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

const badgeStyles = {
  bronze: {
    bg: "bg-[#fef3e2]",
    border: "border-[#b87333]",
    icon: "text-[#b87333]",
    text: "text-[#924c1c]",
    tooltip: "Bronze badge: Starting your journey!",
  },
  silver: {
    bg: "bg-[#f4f4f5]",
    border: "border-gray-400",
    icon: "text-gray-500",
    text: "text-gray-700",
    tooltip: "Silver badge: Solid progress made!",
  },
  golden: {
    bg: "bg-[#fff9db]",
    border: "border-yellow-400",
    icon: "text-yellow-500",
    text: "text-yellow-600",
    tooltip: "Golden badge: You are a top achiever!",
  },
};

const EarnedBadges = ({ badges }) => {
  const renderBadge = (type, Icon) => {
    const { bg, border, icon, text, tooltip } = badgeStyles[type];
    return (
      <div
        className={`flex items-center gap-2 ${bg} border ${border} rounded-xl px-4 py-2 cursor-default hover:shadow-xl transition-shadow`}
        data-tooltip-id={`${type}Tooltip`}
        data-tooltip-content={tooltip}
      >
        <Icon className={`${icon} text-xl`} />
        <span className={`font-medium ${text} text-base capitalize`}>{type}</span>
      </div>
    );
  };

  return (
    <section className="w-full md:w-1/3 bg-white rounded-2xl hover:shadow-xl  border-2 border-blue-300 p-4">
      <h2 className="flex items-center gap-3 text-blue-700 font-bold text-xl mb-6">
        <span>Earned Badges</span>
      </h2>

      <div className="flex flex-wrap gap-4 justify-start">
        {badges?.bronze && renderBadge("bronze", GiLaurelsTrophy)}
        {badges?.silver && renderBadge("silver", GiLaurelsTrophy)}
        {badges?.golden && renderBadge("golden", AiFillStar)}

        {!badges?.bronze && !badges?.silver && !badges?.golden && (
          <p className="text-gray-500 text-sm italic">
            No badges earned yet. Start solving challenges!
          </p>
        )}
      </div>
    </section>
  );
};

export default EarnedBadges;
