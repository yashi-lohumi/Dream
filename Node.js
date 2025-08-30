// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  const response = await fetch("https://api-inference.huggingface.co/models/distilgpt2", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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", // safe here, not exposed to browser
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
