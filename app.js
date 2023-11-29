import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(bodyParser.json());

let openai = null;

function initializeOpenAI(apiKey) {
  openai = new OpenAI(apiKey);
}

app.post("/setKey", (req, res) => {
  let apiKey = req.body.apiKey;
  console.log(`ApiKey Received: ${apiKey}`);
  try {
    initializeOpenAI({ apiKey: apiKey }); // Pass apiKey directly
    res.status(201).send("API Key Set Successfully");
    console.log("API Key Set Successfully");
  } catch (error) {
    console.error("Error initializing OpenAI client:", error);
    res.status(500).send("Failed to initialize OpenAI client");
    return;
  }
});

app.post("/conversation", async (req, res) => {
  if (!openai) {
    res
      .status(400)
      .send("OpenAI client is not initialized. Set API key first.");
    return;
  }

  const { instructions, messageContent, additionalInstructions } = req.body;

  try {
    // Create an assistant
    const assistant = await openai.beta.assistants.create({
      name: "User Custom Assistant",
      instructions: instructions || "Respond to user queries",
      model: "gpt-3.5-turbo-1106",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
    });

    // Create a thread
    const currentThread = await openai.beta.threads.create();

    // Send a message
    await openai.beta.threads.messages.create(currentThread.id, {
      role: "user",
      content: messageContent,
    });

    // Create a run
    const run = await openai.beta.threads.runs.create(currentThread.id, {
      assistant_id: assistant.id,
      instructions:
        additionalInstructions || "Provide detailed and rich responses",
    });

    // Polling for run completion
    let response;
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
      response = await openai.beta.threads.runs.retrieve(
        currentThread.id,
        run.id
      );
    } while (response.status !== "completed");

    // Wait a bit more for messages to be available (additional delay)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Retrieve messages
    const messages = await openai.beta.threads.messages.list(currentThread.id);

    res.send({
      assistantId: assistant.id,
      threadId: currentThread.id,
      runId: run.id,
      messages: messages.data,
    });
    console.log(messages.content.text);
  } catch (error) {
    console.error("Error in conversation:", error);
    res.status(500).send("Error in conversation");
  }
});

app.get("/getResponse/:runId", async (req, res) => {
  const runId = req.params.runId;
  console.log("Run ID : ", runId);
  const response = await openai.beta.threads.runs.retrieve(
    currentThread.id,
    runId
  );

  if (response.status === "completed") {
    const messages = await openai.beta.threads.messages.list(currentThread.id);
    res.send(messages);
    console.log("Messages :", messages);
  } else {
    res.send({ status: response.status });
  }
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
