import TelegramBot from "node-telegram-bot-api"; 
import mongoose from "mongoose";
import config from "./config/config.js";
import * as announcementController from "./controllers/announcementController.js";
import * as communityController from "./controllers/communityController.js";
import * as startController from "./controllers/startController.js";
import { Community } from "./models/Community.js";
import { isBotAdminInGroup } from "./services/adminService.js";
import { handleOnBoardCommunity } from "./controllers/onBoardCommunityController.js";
import { handlePreviewAnnouncement } from "./controllers/previewController.js";
import { myAnnouncements } from "./controllers/myAnnouncmentController.js";
import { myCommunity } from "./controllers/myCommunityController.js";
import { handleHelp } from "./controllers/helpController.js";
import { setupReactionHandler } from "./controllers/privateGroupController.js";
import axios from "axios";
<<<<<<< HEAD

=======
import puppeteer from "puppeteer";
>>>>>>> 5869f9b27f2e0fc022db44d637f01949dca95ccf

const bot = new TelegramBot(config.BOT_TOKEN, {
  polling: {
    allowed_updates: ["message", "message_reaction", "message_reaction_count"],
  },
});


<<<<<<< HEAD
async function fetchSonarResponse(query) {
  try {
    const response = await axios.post(
      "https://api.perplexity.ai/v1/sonar", 
      { query }, 
      { headers: { Authorization: `Bearer ${config.SONAR_API_KEY}` } }
    );
    return response.data.answer || "No response found.";
  } catch (error) {
    console.error("Error fetching Sonar API response:", error.response ? error.response.data : error.message);
    return "Error: Could not fetch response.";
=======
async function fetchPerplexityResponse(query) {
  const browser = await puppeteer.launch({ headless: "new" }); // Headless mode (no UI)
  const page = await browser.newPage();

  try {
    await page.goto("https://www.perplexity.ai/", { waitUntil: "networkidle2" });


    await page.waitForSelector("textarea");
    await page.type("textarea", query);
    

    await page.keyboard.press("Enter");


    await page.waitForSelector(".markdown", { timeout: 10000 });


    const responseText = await page.evaluate(() => {
      const responseElement = document.querySelector(".markdown");
      return responseElement ? responseElement.innerText : "No response found.";
    });

    console.log("Perplexity AI Response:", responseText);
    return responseText;
  } catch (error) {
    console.error("Error fetching Perplexity AI response:", error.message);
    return "Error: Could not fetch response.";
  } finally {
    await browser.close();
>>>>>>> 5869f9b27f2e0fc022db44d637f01949dca95ccf
  }
}

// Get bot info for reference
let botInfo = null;
try {
  const info = await bot.getMe();
  botInfo = info;
  console.log(`Bot Username: ${botInfo.username}, Bot ID: ${botInfo.id}`);
} catch (error) {
  console.error(`Error getting bot info: ${error.message}`);
}

let groupId = "";

<<<<<<< HEAD

=======
>>>>>>> 5869f9b27f2e0fc022db44d637f01949dca95ccf
const commands = [
  { command: "start", description: "Start the bot" },
  { command: "help", description: "List available commands" },
  { command: "create_announcement", description: "Create an announcement" },
  { command: "add_community", description: "Add a community" },
  { command: "my_announcements", description: "View my announcements" },
  { command: "my_community", description: "View my community" },
  { command: "list_communities", description: "List all communities", adminOnly: true },
  { command: "ask", description: "Ask a question using Sonar AI" }
];

bot.setMyCommands(commands).then(() => {
  console.log("Commands set successfully");
});

// Event listener for when the bot is added to a group
bot.on("message", async (msg) => {
  try {
    // If the bot is added to a group
    if (msg.new_chat_members) {
      const newMembers = msg.new_chat_members;
      const botInfo = await bot.getMe();

      // Check if the bot has been added to the group
      const botAdded = newMembers.some((member) => member.id === botInfo.id);

      if (botAdded) {
        console.log("Bot has been added to a group:", msg.chat.id);
        groupId = msg.chat.id;
        const isBotAdmin = await isBotAdminInGroup(bot, msg.chat.id);

        if (isBotAdmin) {
          console.log("Bot is already an admin in the group.");
          await bot.sendMessage(
            msg.chat.id,
            "Hello! I'm fully functional as I have admin permissions. Thanks for inviting me!"
          );
        } else {
          console.log("Bot is not an admin in this group.");
          await bot.sendMessage(
            msg.chat.id,
            "To make me fully functional, please promote me to an admin in this group."
          );
        }
      }
      return;
    }

// added capabilities to handle normal messages. I will add the program for perplexity convos from here onwards
    if (!msg.text.startsWith("/")) {
      console.log(`Received normal message: ${msg.text}`);

      const userMessage = msg.text.toLowerCase();
      let response = "I'm not sure how to respond to that. Try using /help.";

      if (userMessage.includes("hello") || userMessage.includes("hi")) {
        response = "Hello! How can I assist you today? ";
      } else if (userMessage.includes("bye")) {
        response = "Goodbye! Have a great day! ";
      } else if (userMessage.includes("thank you")) {
        response = "You're welcome! ";
      }

      bot.sendMessage(msg.chat.id, response);
      return;
    }
  } catch (error) {
    console.error("Error processing message:", error.message);
  }
});

setupReactionHandler(bot);



<<<<<<< HEAD

=======
>>>>>>> 5869f9b27f2e0fc022db44d637f01949dca95ccf
bot.onText(/\/ask (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];

  if (!query) {
<<<<<<< HEAD
    bot.sendMessage(chatId, "Please provide a question?");
    return;
  }

  bot.sendMessage(chatId, "Fetching response from Sonar AI...");
  const response = await fetchSonarResponse(query);
=======
    bot.sendMessage(chatId, "Please provide a query. Example: /ask What is AI?");
    return;
  }

  bot.sendMessage(chatId, "Fetching response from Perplexity AI...");

  const response = await fetchPerplexityResponse(query);
>>>>>>> 5869f9b27f2e0fc022db44d637f01949dca95ccf
  bot.sendMessage(chatId, response);
});


<<<<<<< HEAD
=======


>>>>>>> 5869f9b27f2e0fc022db44d637f01949dca95ccf
bot.on("callback_query", async (callbackQuery) => {
  const msg = callbackQuery.message;

  if (!msg) {
    console.error("Message is not defined in callbackQuery");
    return;
  }

  const chatId = groupId;
  const data = callbackQuery.data;

  console.log("Callback data:", data);
  if (data === "check_admin") {
    try {
      const isAdmin = await isBotAdminInGroup(bot, chatId);

      if (isAdmin) {
        await bot.sendMessage(
          msg.chat.id,
          `Awesome! 🎉 I'm all set up in your group. Let's get your community listed on Younity! Fill out this form to get started.`
        );
        handleOnBoardCommunity(bot, msg);
      } else {
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: "The bot is not an admin in this group. Please promote the bot to an admin.",
        });
      }
    } catch (error) {
      console.error("Error checking admin status:", error.message);
      await bot.answerCallbackQuery(callbackQuery.id, {
        text: "An error occurred while checking admin status.",
      });
    }
  }
});
setupReactionHandler(bot);
bot.on("polling_error", (error) =>
  console.error(`Polling error: ${error.message}`)
);

bot.onText(/\/start/, async (msg) => {
  startController.handleStart(bot, msg);
});

bot.onText(/\/create_announcement/, (msg) => {
  announcementController.handleAnnouncementCreation(bot, msg);
});

bot.onText(/\/add_community/, (msg) => {
  communityController.handleBotInvite(bot, msg);
});

bot.onText(/\/preview/, (msg) => {
  handlePreviewAnnouncement(bot, msg);
});

bot.onText(/\/my_announcements/, (msg) => {
  myAnnouncements(bot, msg);
});

bot.onText(/\/my_community/, (msg) => {
  myCommunity(bot, msg);
});

bot.onText(/\/help/, (msg) => {
  handleHelp(bot, msg);
});

bot.onText(/\/membercount/, async (msg) => {
  const groupId = "-1002387804281";
  const memberCount = await bot.getChatMemberCount(groupId);
  console.log(`Number of members in chat: ${memberCount}`);
});

export default bot;
