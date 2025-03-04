let botInfo = null;
try {
  botInfo = await bot.getMe(); // Set this once at the top
  console.log(`Bot Username: ${botInfo.username}, Bot ID: ${botInfo.id}`);
} catch (error) {
  console.error(`Error getting bot info: ${error.message}`);
}

// Then use botInfo in your functions:
export const isBotAdminInGroup = async (bot, chatId) => {
  try {
    if (!botInfo) {
      botInfo = await bot.getMe(); // Ensure botInfo is available
    }

    const chatMember = await bot.getChatMember(chatId, botInfo.id);
    return (
      chatMember.status === "administrator" || chatMember.status === "creator"
    );
  } catch (error) {
    console.error("Error checking bot admin status:", error.message);
    return false;
  }
};
