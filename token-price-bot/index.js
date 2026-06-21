async function getPrice(coinId) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data[coinId]) {
    console.error(`Coin "${coinId}" not found.`);
    return;
  }

  const price = data[coinId].usd;
  const change = data[coinId].usd_24h_change;
  const arrow = change >= 0 ? "📈" : "📉";
  console.log(`${arrow} ${coinId.toUpperCase()}: $${price} (${change.toFixed(2)}% 24h)`);
}

const coinId = process.argv[2] || "ethereum";
getPrice(coinId).catch((err) => console.error("Failed to fetch price:", err.message));
