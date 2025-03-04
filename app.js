import TelegramBot from "node-telegram-bot-api";
import mongoose from "mongoose";
import config from "./config/config.js";
import * as adminService from "./services/adminService.js";
import * as communityController from "./controllers/communityController.js";
import bot from "./bot.js";
import { setupReactionHandler } from "./controllers/privateGroupController.js";

// Connect to MongoDB
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Check if the user is an admin
const isAdmin = (userId) => {
  // return adminService.isAdmin(userId);
  return true;
};

// Admin Command: /add_community
bot.onText(/\/add_community/, (msg) => {
  const userId = msg.from.id;

  if (!isAdmin(userId)) {
    return bot.sendMessage(
      msg.chat.id,
      "Unauthorized. You are not allowed to use this command."
    );
  }

  // Handle community onboarding via bot
  // communityController.handleBotInvite(bot, msg);
});

// setupReactionHandler(bot);

// Admin Command: /list_communities
bot.onText(/\/list_communities/, async (msg) => {
  const userId = msg.from.id;

  if (!isAdmin(userId)) {
    return bot.sendMessage(
      msg.chat.id,
      "Unauthorized. You are not allowed to use this command."
    );
  }

  // Fetch and list communities from the database
  const communities = await communityController.listCommunities();
  let message = "Here are the onboarded communities:\n\n";

  communities.forEach((community, index) => {
    message += `${index + 1}. ${community.communityName}\n`;
    message += `  Focus: ${community.focusAreas}\n`;
    message += `  Members: ${community.totalMembers}\n`;
    message += `  Price: ${community.charges} USDT\n`;
    message += `  Wallet: ${community.walletAddress}\n`;

    // Adding the cities
    if (community.cities && community.cities.length > 0) {
      message += `  Cities: ${community.cities.join(", ")}\n`;
    } else {
      message += `  Cities: N/A\n`;
    }

    message += `\n`; // Add a new line for separation between communities
  });

  bot.sendMessage(msg.chat.id, message || "No communities available.");
});

export default bot;
