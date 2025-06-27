import React from "react";
import { useDashboardData } from "../Hooks/Dashboard/useDashboardData";
import Sidebar from "../Components/Dashboard/Sidebar";
import ProfileOverview from "../Components/Dashboard/ProfileOverview";
import RecentActivitySection from "../Components/Dashboard/RecentActivitySection";
import EarnedBadges from "../Components/Dashboard/EarnedBadges";
import ActivitySummary from "../Components/Dashboard/ActivitySummary";
import AccuracyCharts from "../Components/Dashboard/AccuracyCharts";
import { FaSpinner } from "react-icons/fa";

const Dashboard = () => {
  const { user, rankData, mcqProgress, codingProgress, recentActivity } = useDashboardData();

  const isLoading =
    !user || !rankData || mcqProgress === null || codingProgress === null || !recentActivity;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar always renders */}
      <Sidebar />

      <main className="flex-1 p-4 overflow-y-auto flex gap-6">
        {/*  Show loading state for main dashboard only */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-blue-600 text-lg font-medium">

             <FaSpinner className="animate-spin text-6xl mb-2" />
          </div>
        ) : (
          <>
            {/* Left Section */}
            <section className="w-[70%] space-y-4">
              <ProfileOverview user={user} rankData={rankData} />

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
              />

              <div className="flex gap-6">
                <EarnedBadges badges={user.badges} />
                <ActivitySummary recentActivity={recentActivity} />
              </div>
            </section>

            {/* Right Section */}
            <RecentActivitySection recentActivity={recentActivity} />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
