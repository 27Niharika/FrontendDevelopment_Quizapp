import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// === MIDDLEWARE ===
app.use(cors());               // <-- cors AFTER app is initialized
app.use(bodyParser.json());

// === ROUTE TO GET DYNAMIC QUESTIONS ===
app.post("/get-questions", async (req, res) => {
  const { category, topic, level } = req.body;
  const totalQuestions = level === 1 ? 10 : 20;

  const prompt = `Generate ${totalQuestions} multiple-choice questions (4 options each, correct option index 0-3) for category "${category}" and topic "${topic}". Return JSON array: [{q:"Question text", options:["A","B","C","D"], answer:0}, ...]`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    let questions = [];
    try { questions = JSON.parse(data.choices[0].message.content); } catch (e) { console.error(e); }

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// === START SERVER ===
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
