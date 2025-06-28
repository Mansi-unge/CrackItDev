import { useState, useEffect, useRef } from "react";
import {
  fetchUserProfile,
  fetchUserRank,
  fetchMcqProgress,
  fetchCodingProgress,
  fetchRecentActivity,
  fetchDsaProgress,
} from "../../services/Dashboard/userDashboardService";
import { toast } from "react-toastify";

export const useDashboardData = () => {
  const [user, setUser] = useState(null);
  const [rankData, setRankData] = useState(null);
  const [mcqProgress, setMcqProgress] = useState(null);
  const [codingProgress, setCodingProgress] = useState(null);
   const [dsaProgress, setDsaProgress] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  const hasFetched = useRef(false); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.warning("Please login to access your dashboard");
      return;
    }

    // ⛔ Prevent duplicate execution due to React.StrictMode in dev
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const profileRes = await fetchUserProfile(token);
        const userId = profileRes.data._id;

        const [rankRes, mcqRes, codingRes , dsaRes, activityRes] = await Promise.all([
          fetchUserRank(token),
          fetchMcqProgress(token),
          fetchCodingProgress(token),
          fetchDsaProgress(token),
          fetchRecentActivity(token, userId),
        ]);

        setUser(profileRes.data);
        setRankData(rankRes.data.currentUser);
        setMcqProgress(mcqRes.data);
        setCodingProgress(codingRes.data);
        setDsaProgress(dsaRes.data);
        setRecentActivity(activityRes.data.recentActivity);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Something went wrong while loading your dashboard");
      }
    };

    fetchData();
  }, [token]);

  return { user, rankData, mcqProgress, codingProgress, dsaProgress, recentActivity };
};
