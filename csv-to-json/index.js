const fs = require("fs");

function csvToJson(csvText) {
  const [headerLine, ...lines] = csvText.trim().split("\n");
  const headers = headerLine.split(",").map((h) => h.trim());
  return lines.map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const obj = {};
    headers.forEach((header, i) => { obj[header] = values[i]; });
    return obj;
  });
}

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "output.json";
if (!inputPath) {
  console.error("Usage: node index.js <input.csv> [output.json]");
  process.exit(1);
}

const csvText = fs.readFileSync(inputPath, "utf-8");
const json = csvToJson(csvText);
fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));
console.log(`✅ Converted ${json.length} rows → ${outputPath}`);
