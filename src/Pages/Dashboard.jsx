import React from "react";
import { useDashboardData } from "../Hooks/Dashboard/useDashboardData";
import Sidebar from "../Components/Dashboard/Sidebar";
// import Header from "../Components/Header"; // ✅ Import header
import Header from "../Components/Common/Header";
import RecentActivitySection from "../Components/Dashboard/RecentActivitySection";
import EarnedBadges from "../Components/Dashboard/EarnedBadges";
import ActivitySummary from "../Components/Dashboard/ActivitySummary";
import AccuracyCharts from "../Components/Dashboard/AccuracyCharts";
import { FaSpinner } from "react-icons/fa";
import UserPointsCard from "../Components/Dashboard/UserPointsCard";
import UserInfoCard from "../Components/Dashboard/UserInfoCard";
import UserActivityHeatmap from "../Components/Dashboard/UserActivityHeatmap";

const Dashboard = () => {
  const {
    user,
    rankData,
    mcqProgress,
    codingProgress,
    dsaProgress,
    recentActivity,
    activityHeatmap,
  } = useDashboardData();

  const isLoading =
    !user ||
    !rankData ||
    mcqProgress === null ||
    codingProgress === null ||
    dsaProgress === null ||
    !recentActivity;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* ✅ Show Header on small screens */}
      <div className="block lg:hidden w-full">
        <Header />
      </div>

      {/* ✅ Show Sidebar on large screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-blue-600 text-lg font-medium">
            <FaSpinner className="animate-spin text-6xl mb-2" />
          </div>
        ) : (
          <>
            {/* 🔹 User InfoCard on top for mobile */}
            <div className="lg:hidden">
              <UserInfoCard user={user} />
            </div>

            {/* 🔹 Main Content Split for large screens */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left Section */}
              <section className="w-full lg:w-[70%] space-y-4">
                <UserPointsCard points={user.points} rankData={rankData} />

                <AccuracyCharts
                  mcqData={{
                    correct:
                      mcqProgress?.solvedMcqQuestions?.filter((q) => q.isCorrect).length || 0,
                    total: mcqProgress?.solvedMcqQuestions?.length || 0,
                  }}
                  codingData={{
                    correct:
                      codingProgress?.solvedCodingQuestions?.filter((q) => q.isCorrect).length || 0,
                    total: codingProgress?.solvedCodingQuestions?.length || 0,
                  }}
                  dsaData={{
                    correct:
                      dsaProgress?.solvedQuestions?.filter((q) => q.isCorrect)?.length || 0,
                    total: dsaProgress?.solvedQuestions?.length || 0,
                  }}
                />

                <div className="flex flex-col md:flex-row gap-6">
                  <EarnedBadges badges={user.badges} />
                  <ActivitySummary recentActivity={recentActivity} />
                </div>
              </section>

              {/* Right Section */}
              <section className="w-full lg:w-[30%] space-y-3">
                {/* Only show UserInfoCard on large screens here */}
                <div className="hidden lg:block">
                  <UserInfoCard user={user} />
                </div>

                <UserActivityHeatmap activityData={activityHeatmap} />
                <RecentActivitySection recentActivity={recentActivity} />
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
