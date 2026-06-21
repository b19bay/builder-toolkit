const { ethers } = require("ethers");

const RPC_URL = "https://mainnet.base.org";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ABI = [];
const BYTECODE = "0x";

async function deploy() {
  if (!PRIVATE_KEY) {
    console.error("Set PRIVATE_KEY env var before running.");
    process.exit(1);
  }
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  console.log(`Deploying from: ${wallet.address}`);
  const factory = new ethers.ContractFactory(ABI, BYTECODE, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log(`✅ Contract deployed at: ${await contract.getAddress()}`);
}

deploy().catch((err) => console.error("Deploy failed:", err.message));
