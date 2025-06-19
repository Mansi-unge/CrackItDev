import User from "../../models/Users.js";

const getCodingProgress = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    res.json({
      solvedCodingQuestions: user.solvedCodingQuestions || [],
      points: user.points?.coding || 0,
      badges: user.badges || { bronze: 0, silver: 0, golden: 0 },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getCodingProgress