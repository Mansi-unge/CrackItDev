import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

// ✅ Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const mcq = payload.find(p => p.dataKey === "mcqCount")?.value || 0;
    const coding = payload.find(p => p.dataKey === "codingCount")?.value || 0;
    const dsa = payload.find(p => p.dataKey === "dsaCount")?.value || 0;

    return (
      <div className="bg-white border border-blue-300 rounded-lg shadow-md p-2 text-sm text-gray-800">
        <p className="font-semibold">{label}</p>
        <p>MCQ - {mcq}</p>
        <p>Coding - {coding}</p>
        <p>DSA - {dsa}</p>
      </div>
    );
  }
  return null;
};

const ActivitySummary = ({ recentActivity }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Prepare 7-day activity data
  const daysCount = {};
  for (let i = 6; i >= 0; i--) {
    const day = dayjs().subtract(i, "day").format("MMM D");
    daysCount[day] = { mcqCount: 0, codingCount: 0, dsaCount: 0 };
  }

  recentActivity.forEach((act) => {
    const day = dayjs(act.answeredAt).format("MMM D");
    if (daysCount.hasOwnProperty(day)) {
      if (act.type === "mcq") daysCount[day].mcqCount++;
      else if (act.type === "coding") daysCount[day].codingCount++;
      else if (act.type === "dsa") daysCount[day].dsaCount++;
    }
  });

  const activityData = Object.entries(daysCount).map(([date, counts]) => ({
    date,
    ...counts,
  }));

  return (
    <section className="w-full max-w-4xl mx-auto bg-white border-2 border-blue-300 rounded-3xl py-4 transition hover:shadow-xl overflow-hidden">
      <style>
        {`
          .recharts-active-bar-background {
            display: none !important;
          }
        `}
      </style>

      <h2 className="text-lg font-bold mb-4 text-blue-700 px-4">
        Weekly Activity Overview
      </h2>

      <div className="px-2">
        {isMobile ? (
          // ✅ Mobile Chart Layout
          <>
            <div style={{ width: "320px", height: "8rem" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                  barCategoryGap="6%"
                >
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#4b5563" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                  <Bar dataKey="mcqCount" fill="url(#colorMcq)" barSize={8} radius={[5, 5, 0, 0]} />
                  <Bar dataKey="codingCount" fill="url(#colorCoding)" barSize={8} radius={[5, 5, 0, 0]} />
                  <Bar dataKey="dsaCount" fill="url(#colorDsa)" barSize={8} radius={[5, 5, 0, 0]} />
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="colorMcq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="colorCoding" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#c084fc" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="colorDsa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#6ee7b7" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ✅ Mobile Legend Below */}
            <div className="flex justify-center gap-4 text-sm font-medium mt-2">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to bottom, #3b82f6, #60a5fa)' }}></span>
                <span className="text-gray-700">MCQ</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to bottom, #8b5cf6, #c084fc)' }}></span>
                <span className="text-gray-700">Coding</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to bottom, #10b981, #6ee7b7)' }}></span>
                <span className="text-gray-700">DSA</span>
              </div>
            </div>
          </>
        ) : (
          // ✅ Desktop Chart Layout
          <div style={{ width: "100%", height: "16rem" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                barCategoryGap="20%"
              >
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#4b5563" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#4b5563" }}
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="mcqCount" name="MCQ Challenges" fill="url(#colorMcq)" barSize={14} radius={[5, 5, 0, 0]} />
                <Bar dataKey="codingCount" name="Coding Challenges" fill="url(#colorCoding)" barSize={14} radius={[5, 5, 0, 0]} />
                <Bar dataKey="dsaCount" name="DSA Challenges" fill="url(#colorDsa)" barSize={14} radius={[5, 5, 0, 0]} />

                {/* Gradients */}
                <defs>
                  <linearGradient id="colorMcq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="colorCoding" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#c084fc" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="colorDsa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#6ee7b7" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitySummary;
