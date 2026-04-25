import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Database for Source Credibility
  const sources = [
    { id: 1, name: "The Hindu", trustScore: 92, bias: "Center-Left", accuracy: 95 },
    { id: 2, name: "NDTV", trustScore: 88, bias: "Left-Center", accuracy: 92 },
    { id: 3, name: "Times of India", trustScore: 85, bias: "Center-Right", accuracy: 90 },
    { id: 4, name: "BBC News", trustScore: 94, bias: "Center", accuracy: 96 },
    { id: 5, name: "Reuters", trustScore: 98, bias: "Center", accuracy: 99 },
    { id: 6, name: "Alt News", trustScore: 95, bias: "Fact-Checker", accuracy: 98 },
    { id: 7, name: "Boom Live", trustScore: 95, bias: "Fact-Checker", accuracy: 98 },
  ];

  // Mock Database for Flagged Content
  const flaggedContent = [
    { id: 1, content: "Viral video claiming salt cures COVID-19", status: "Reviewed", verdict: "False", flags: 156 },
    { id: 2, content: "Headline: New tax law passed in midnight session", status: "Pending", verdict: null, flags: 42 },
  ];

  // API Routes
  app.get("/api/sources", (req, res) => {
    res.json(sources);
  });

  app.get("/api/community/flags", (req, res) => {
    res.json(flaggedContent);
  });

  app.post("/api/community/flag", (req, res) => {
    const { content } = req.body;
    const newFlag = { id: flaggedContent.length + 1, content, status: "Pending", verdict: null, flags: 1 };
    flaggedContent.push(newFlag);
    res.status(201).json(newFlag);
  });

  app.post("/api/feedback", (req, res) => {
    const { feedback, email } = req.body;
    console.log(`Received feedback from ${email}: ${feedback}`);
    res.json({ status: "success", message: "Feedback received" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
