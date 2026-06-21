const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());
const store = {};

app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });
  const code = crypto.randomBytes(4).toString("hex");
  store[code] = url;
  res.json({ shortCode: code, shortUrl: `/${code}` });
});

app.get("/:code", (req, res) => {
  const url = store[req.params.code];
  if (!url) return res.status(404).json({ error: "not found" });
  res.redirect(url);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔗 URL shortener running on port ${PORT}`));
