import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import CORS from "cors";
// Initialize environment variables
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(CORS());

const openai = new OpenAI({
  apiKey: "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",
});

app.get("/", (req, res) => {
  res.send("Welcome to Custom ChatGPT...!");
});

app.post("/chat", async (req, res) => {
  const { messageContent } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: messageContent },
      ],
      model: "gpt-3.5-turbo-1106",
    });

    let response = completion.choices[0];

    res.send(response);
  } catch (error) {
    console.error("Error in /chat endpoint:", error);
    res.status(500).send("Error handling chat request");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
