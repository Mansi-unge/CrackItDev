import User from "../../models/Users.js";

const getMcqProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      solvedMcqQuestions: user.solvedMcqQuestions || [],
      points: user.points?.mcq || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getMcqProgress
