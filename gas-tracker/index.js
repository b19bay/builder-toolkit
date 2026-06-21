const RPC_URL = "https://mainnet.base.org";

async function getGasPrice() {
  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "eth_gasPrice", params: [], id: 1 }),
  });
  const data = await res.json();
  const gasPriceWei = parseInt(data.result, 16);
  const gasPriceGwei = gasPriceWei / 1e9;
  console.log(`⛽ Current Base gas price: ${gasPriceGwei.toFixed(4)} Gwei`);
  return gasPriceGwei;
}

getGasPrice().catch((err) => console.error("Failed to fetch gas price:", err.message));
