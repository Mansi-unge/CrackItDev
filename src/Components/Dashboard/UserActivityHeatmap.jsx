import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";

const UserActivityHeatmap = ({ activityData }) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);

  return (
    <div className="p-4 w-full border-2 bg-white rounded-3xl hover:shadow-xl border-blue-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          Yearly Activity Heatmap
        </h2>
      </div>

      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        showWeekdayLabels={false}
        values={(activityData || []).map((item) => ({
          date: new Date(item.date), // ✅ Ensure this is a Date object
          count: item.count,
        }))}

        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count >= 5) return "color-github-4";
          if (value.count >= 3) return "color-github-3";
          if (value.count >= 2) return "color-github-2";
          return "color-github-1";
        }}
        tooltipDataAttrs={(value) => {
          if (!value?.date) return {};
          return {
            "data-tooltip-id": "user-activity-tooltip",
            "data-tooltip-content": `${value.date}: ${value.count} activities`,
          };
        }}
      />

      <div className="flex justify-end mt-3 text-xs text-gray-500 gap-2">
        <span>Less</span>
        <div className="w-4 h-4 rounded-sm bg-[#ebedf0]" />
        <div className="w-4 h-4 rounded-sm bg-[#9be9a8]" />
        <div className="w-4 h-4 rounded-sm bg-[#40c463]" />
        <div className="w-4 h-4 rounded-sm bg-[#30a14e]" />
        <div className="w-4 h-4 rounded-sm bg-[#216e39]" />
        <span>More</span>
      </div>

      <Tooltip
        id="user-activity-tooltip"
        className="!bg-black !text-white !rounded !px-2 !py-1 text-sm"
      />
    </div>
  );
};

export default UserActivityHeatmap;
