import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { getRecommendationsFromLLM } from "../services/llmService.js";
import { getMoviesWithWatchProviders } from "../services/moviePosterService.js";

dotenv.config();

const router = express.Router();

let client = null;
let db = null;

async function connectDatabase() {
  if (db) return db;

  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/movie-ai";

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
    console.log("✅ Connected to MongoDB");
    return db;
  } catch (err) {
    console.warn("⚠️ MongoDB unavailable (storage only)");
    return null;
  }
}

router.post("/", async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || !input.trim()) {
      return res.status(400).json({ error: "Input is required" });
    }

    const llmResponse = await getRecommendationsFromLLM(input.trim());

    const movieTitles = llmResponse
      .split("\n")
      .filter((line) => line.trim().match(/^MOVIE\s+\d+:/i))
      .map((line) => {
        const match = line.match(/^MOVIE\s+\d+:\s*(.+)$/i);
        return match ? match[1].trim() : null;
      })
      .filter(Boolean);

    let movies = [];
    if (movieTitles.length > 0) {
      movies = await getMoviesWithWatchProviders(movieTitles);
    }

    const database = await connectDatabase();
    if (database) {
      await database.collection("recommendations").insertOne({
        userInput: input.trim(),
        llmResponse,
        timestamp: new Date(),
      });
    }

    res.json({
      recommendations: llmResponse,
      movies,
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(503).json({
      error: "AI is temporarily unavailable",
    });
  }
});

export default router;