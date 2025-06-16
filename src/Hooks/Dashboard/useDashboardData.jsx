import { useState, useEffect } from "react";
import { fetchUserProfile , fetchUserRank , fetchMcqProgress , fetchCodingProgress , fetchRecentActivity } from "../../services/Dashboard/userDashboardService";

export const useDashboardData = () => {
  const [user, setUser] = useState(null);
  const [rankData, setRankData] = useState(null);
  const [mcqProgress, setMcqProgress] = useState(null);
  const [codingProgress, setCodingProgress] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const profileRes = await fetchUserProfile(token);
        const userId = profileRes.data._id;

        const [rankRes, mcqRes, codingRes, activityRes] = await Promise.all([
          fetchUserRank(token),
          fetchMcqProgress(token),
          fetchCodingProgress(token),
          fetchRecentActivity(token, userId),
        ]);

        setUser(profileRes.data);
        setRankData(rankRes.data.currentUser);
        setMcqProgress(mcqRes.data);
        setCodingProgress(codingRes.data);
        setRecentActivity(activityRes.data.recentActivity);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, [token]);

  return { user, rankData, mcqProgress, codingProgress, recentActivity };
};
