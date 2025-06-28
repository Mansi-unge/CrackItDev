import React from "react";
import { useDashboardData } from "../Hooks/Dashboard/useDashboardData";
import Sidebar from "../Components/Dashboard/Sidebar";
import RecentActivitySection from "../Components/Dashboard/RecentActivitySection";
import EarnedBadges from "../Components/Dashboard/EarnedBadges";
import ActivitySummary from "../Components/Dashboard/ActivitySummary";
import AccuracyCharts from "../Components/Dashboard/AccuracyCharts";
import { FaSpinner } from "react-icons/fa";
import UserPointsCard from "../Components/Dashboard/UserPointsCard";
import UserInfoCard from "../Components/Dashboard/UserInfoCard";
import UserActivityHeatmap from "../Components/Dashboard/UserActivityHeatmap";
const Dashboard = () => {
  const { user, rankData, mcqProgress, codingProgress, dsaProgress, recentActivity , activityHeatmap } = useDashboardData();

  const isLoading =
    !user || !rankData || mcqProgress === null || codingProgress === null || dsaProgress === null || !recentActivity;

  return (
    <div className="flex overflow-hidden h-screen bg-gray-100">
      {/* Sidebar always renders */}
      <Sidebar />

      <main className="flex-1  p-4 overflow-y-auto flex gap-4">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-blue-600 text-lg font-medium">

            <FaSpinner className="animate-spin text-6xl mb-2" />
          </div>
        ) : (
          <>
            {/* Left Section */}
            <section className="w-[70%] space-y-4">
              <div className="flex flex-col lg:flex-row justify-between">

                <UserPointsCard points={user.points} rankData={rankData} />
              </div>


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
                  correct: dsaProgress?.solvedQuestions?.filter(q => q.isCorrect)?.length || 0,
                  total: dsaProgress?.solvedQuestions?.length || 0,
                }}
              />

              <div className="flex gap-6">
              <EarnedBadges badges={user.badges} />
                <ActivitySummary recentActivity={recentActivity} />
              </div>
            </section>

            <section className="w-[30%] space-y-3">
              <UserInfoCard user={user} />
              
                <UserActivityHeatmap activityData={activityHeatmap}  />
              <RecentActivitySection recentActivity={recentActivity} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
