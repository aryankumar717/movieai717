# 🎬 AI Movie Recommendation System

An AI-first movie recommendation system that understands natural language
(movie names, moods, or descriptions) and generates explainable recommendations
using a Large Language Model (LLM).

This project avoids traditional rule-based or genre-filter approaches and relies
entirely on LLM reasoning.

---

## 🏗️ Architecture

- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MongoDB (used for storage/analytics only)
- AI Engine: LLM (Groq / OpenAI)
- Movie Data: OMDb API (posters & metadata)

---

## 🧠 Core Principle: AI-First Design

The LLM is the single source of truth for all recommendation logic.

- Detects whether input is a movie name or a description
- Infers genre, mood, tone, and intent automatically
- Decides which movies to recommend
- Generates human-like explanations

No hard-coded rules. No genre filters. Pure AI reasoning.

---

## 📁 Project Structure

Backend
- config/database.js – MongoDB connection
- routes/recommendations.js – Recommendation API routes
- services/llmService.js – LLM interaction logic
- services/moviePosterService.js – Posters & “Where to Watch” links
- server.js – Express server entry point
- .env.example – Environment variable template

Frontend
- src/App.jsx – Main UI logic
- src/App.css – Styling
- src/main.jsx – React entry point
- index.html – HTML template

---

## 🚀 Setup & Installation

Prerequisites
- Node.js v18+
- MongoDB (local or cloud)
- LLM API key (Groq or OpenAI)
- OMDb API key

Backend Setup

cd backend  
npm install  

Create a .env file (use .env.example as reference):

GROQ_API_KEY=your_llm_api_key  
OMDB_API_KEY=your_omdb_api_key  
MONGODB_URI=mongodb://localhost:27017/movie-ai  
PORT=3001  
FRONTEND_URL=http://localhost:5173  

Start backend:

npm start  

Backend runs at:  
http://localhost:3001  

Health check:  
http://localhost:3001/health  

---

Frontend Setup

cd frontend  
npm install  
npm run dev  

Frontend runs at:  
http://localhost:5173  

---

## 🎯 How It Works

1. User enters a movie name or natural-language description
2. Backend sends raw input to the LLM
3. LLM understands intent and generates recommendations
4. Posters and streaming links are fetched
5. MongoDB stores interaction data (analytics only)
6. Frontend displays recommendations with explanations

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- React + Vite
- MongoDB (storage only)
- LLM (Groq / OpenAI)
- OMDb API

---

## 🔮 Future Enhancements

- User history & preferences
- Feedback-based recommendations
- Multiple LLM providers
- Faster responses using caching
- Enhanced UI & animations

---

## 👨‍💻 Author

Aryan Kumar  
B.Tech CSE Student  
Passionate about AI, backend development, and real-world problem solving
