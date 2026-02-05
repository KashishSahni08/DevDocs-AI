const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

let genAI = null;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  } catch (err) {
    console.warn("Failed to initialize GoogleGenerativeAI client:", err.message || err);
    genAI = null;
  }
} else {
  console.warn("GEMINI_API_KEY not set — using fallback responses for generate().");
}

async function generate(prompt) {
  if (!prompt) return "";

  if (!genAI) {
    // Fallback: return a safe placeholder so endpoints don't error when the API key is missing
    return `Fallback generated content for prompt: ${prompt}`;
  }

  try {
    // Use the client in a defensive way. The library surface may vary between versions,
    // so access the model/generate methods in try/catch and coerce to a string result.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    // Coerce to string safely — some SDK responses expose .response.text(), others return string.
    if (result && typeof result === "string") return result;
    if (result && result.response && typeof result.response.text === "function") {
      return result.response.text();
    }
    if (result && result.output) return String(result.output);

    return String(result || "");
  } catch (error) {
    console.error("Gemini Error:", error);
    // Do not rethrow — return a fallback so the route can handle saving and responding.
    return `Generation failed: ${error.message || String(error)}`;
  }
}

module.exports = generate;