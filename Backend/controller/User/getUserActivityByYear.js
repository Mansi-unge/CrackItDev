import UserActivity from "../../models/UserActivity.js";
import mongoose from "mongoose";

const getUserActivityByYear = async (req, res) => {
  const userId = req.user.id;
  const { year } = req.query;

  try {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${parseInt(year) + 1}-01-01`);

    const activity = await UserActivity.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$date",
          totalCount: { $sum: "$count" },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$_id" }
          },
          count: "$totalCount",
        },
      },
      {
        $sort: { date: 1 }
      }
    ]);

    res.status(200).json(activity);
  } catch (error) {
    console.error("Error in getUserActivityByYear:", error);
    res.status(500).json({ message: "Failed to fetch activity", error });
  }
};


export default getUserActivityByYear