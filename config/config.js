import dotenv from "dotenv";

// Load environment variables from the `.env` file
dotenv.config();

const config = {
  BOT_TOKEN:
    process.env.BOT_TOKEN || "7888425579:AAHYtMlMDjv7CVkTpr1QN-EP3d0kk7pTsRo", // Telegram Bot Token
  MONGO_URI: process.env.MONGO_URI, // MongoDB URI
  CRYPTO_WALLET: process.env.CRYPTO_WALLET, // Platform's wallet address
  INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID, // Infura Project ID for Web3 connection
  BASE_RPC_URL: "https://polygon-rpc.com", // Base Chain Testnet URL
  WALLET_CONNECT_BRIDGE: "https://bridge.walletconnect.org", // WalletConnect Bridge URL
  BOT_ADMIN_ID: process.env.BOT_ADMIN_ID, // Admin ID for your bot
};

export default config;
