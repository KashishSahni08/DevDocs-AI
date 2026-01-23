// const express = require("express");
// const router = express.Router();
// const generate = require("../gemini");

// router.post("/generate-docs", async (req, res) => {
//   try {
//     console.log("/doc/generate-docs HIT");

//     const { projectName, features, techStack, apis, modules } = req.body;

//     if (!projectName) {
//       return res.status(400).json({ error: "Project name is required" });
//     }

//     const prompt = `
// Generate professional project documentation.

// Project Name: ${projectName}
// Features: ${features}
// Tech Stack: ${techStack}
// APIs: ${apis}
// Modules: ${modules}

// Include:
// 1. README
// 2. Installation
// 3. Usage
// 4. API Docs
// 5. Modules
// `;

//     const documentation = await generate(prompt);

//     res.status(200).json({ documentation });

//   } catch (error) {
//     console.error(" Route Error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;