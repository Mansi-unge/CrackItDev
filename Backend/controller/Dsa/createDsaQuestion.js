// controllers/dsa/createDsaQuestion.js
import DsaQuestion from "../../models/DsaQuestion.js";

const createDsaQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      topic,
      constraints,
      examples,
      testCases,
      supportedTechStacks,
      hints,
      functionName,  // NEW FIELD
    } = req.body;

    const newQuestion = new DsaQuestion({
      title,
      description,
      difficulty,
      topic,
      constraints,
      examples,
      testCases,
      supportedTechStacks,
      hints,
      functionName,  // assign new field here
    });

    await newQuestion.save();

    res.status(201).json({
      success: true,
      message: "DSA Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.error("Error creating DSA question:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while creating question",
    });
  }
};

export default createDsaQuestion;
