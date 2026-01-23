const express = require("express");
const mongoose = require("./connection");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/UserRouter");
// const docRouter = require("./routes/docRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

app.use("/user", userRouter);
// app.use("/doc", docRouter);

app.get("/", (req, res) => {
  res.send("Welcome to DevsDocsAI");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
