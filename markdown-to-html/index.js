const fs = require("fs");

function mdToHtml(md) {
  return md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
    .replace(/\n$/gim, "<br/>")
    .split("\n\n")
    .map((p) => (p.startsWith("<h") ? p : `<p>${p}</p>`))
    .join("\n");
}

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "output.html";
if (!inputPath) {
  console.error("Usage: node index.js <input.md> [output.html]");
  process.exit(1);
}

const md = fs.readFileSync(inputPath, "utf-8");
fs.writeFileSync(outputPath, mdToHtml(md));
console.log(`✅ Converted ${inputPath} → ${outputPath}`);
