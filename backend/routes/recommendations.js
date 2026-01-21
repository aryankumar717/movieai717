import express from "express";
import { getRecommendationsFromLLM } from "../services/llmService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || !input.trim()) {
      return res.status(400).json({ error: "Input is required" });
    }

    const recommendations = await getRecommendationsFromLLM(input.trim());

    res.json({
      recommendations // ✅ frontend expects this key
    });
  } catch (error) {
    console.error("Recommendation error:", error.message);
    res.status(500).json({
      error: "AI is temporarily unavailable"
    });
  }
});

export default router;
