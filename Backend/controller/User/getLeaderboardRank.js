import User from "../../models/Users.js";

export const getLeaderboardRank = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User info missing" });
    }

    const users = await User.find();

    const usersWithScores = users.map((user) => {
      const mcqPoints = user.points?.mcq || 0;
      const codingPoints = user.points?.coding || 0;
      const dsaPoints = user.points?.dsa || 0;

      const totalScore = mcqPoints + codingPoints + dsaPoints;

      return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        totalScore,
      };
    });

    usersWithScores.sort((a, b) => b.totalScore - a.totalScore);

    const totalUsers = usersWithScores.length;
    const currentUserId = req.user.id;
    const currentUserIndex = usersWithScores.findIndex(u => u.id === currentUserId.toString());
    const rank = currentUserIndex + 1;
    const percentile = totalUsers === 1 ? 100 : ((totalUsers - rank) / totalUsers) * 100;

    const currentUserData = usersWithScores[currentUserIndex];
    const topUsers = usersWithScores.slice(0, 10);

    res.json({
      topUsers,
      currentUser: {
        id: currentUserData.id,
        username: currentUserData.username,
        totalScore: currentUserData.totalScore,
        rank,
        percentile: percentile.toFixed(2),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard data", error: err.message });
  }
};
