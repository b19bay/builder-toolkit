const RPC_URL = "https://mainnet.base.org";

async function getBalance(address) {
  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "eth_getBalance", params: [address, "latest"], id: 1 }),
  });
  const data = await res.json();
  const balanceWei = BigInt(data.result);
  const balanceEth = Number(balanceWei) / 1e18;
  console.log(`💰 Balance of ${address}: ${balanceEth.toFixed(6)} ETH`);
  return balanceEth;
}

const address = process.argv[2];
if (!address) {
  console.error("Usage: node index.js <wallet_address>");
  process.exit(1);
}

getBalance(address).catch((err) => console.error("Failed to fetch balance:", err.message));
