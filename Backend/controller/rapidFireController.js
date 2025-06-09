import User from "../models/Users.js";

export const saveRapidFireProgress = async (req, res) => {
  const { questionId, success } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const today = new Date().toISOString().split("T")[0];
    const last = user.streak.lastCompletedDate?.toISOString().split("T")[0];

    if (last === today) return res.status(400).json({ message: "Already completed today" });

    user.solvedRapidFireQuestions.push({ questionId, success });

    user.streak.current = (last === getYesterdayDate()) ? user.streak.current + 1 : 1;
    user.streak.lastCompletedDate = new Date();

    if (user.streak.current > user.streak.max) {
      user.streak.max = user.streak.current;
    }

    await user.save();
    res.json({ message: "Rapid Fire saved", streak: user.streak });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
};
