require("dotenv").config();
const express = require("express");
const mongoose = require("./connection");
const cors = require("cors");
const userRouter = require("./routes/UserRouter");
const docRouter = require("./routes/docRouter");
const chat = require("./routes/chat");
const upload = require("./routes/upload");
const template = require("./routes/template");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ 
  origin: ["http://localhost:3000"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
})); 
app.use(express.json());

app.use("/user", userRouter);
app.use("/doc", docRouter);
app.use("/chat", chat);
app.use("/upload", upload);
app.use("/template",template);

app.get("/", (req, res) => {
  res.send("Welcome to DevsDocsAI");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
