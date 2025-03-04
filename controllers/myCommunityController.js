import { Community } from "../models/Community.js";

export const myCommunity = async (bot, msg) => {
  const chatId = msg.chat.id;

  // Fetch all communities
  const allCommunities = await Community.find({ userId: chatId });

  const myCommunitiesMessage = `
Here are your communities:
1. basedcomm1-private (Verified ✅)
2. basedcomm2-public (Verified ✅)
`;

  if (allCommunities.length === 0) {
    await bot.sendMessage(chatId, myCommunitiesMessage);
    return;
  }

  // Initialize stats
  let pendingPayments = 0;
  let communityStats = `📊 *Your Community Stats:*\n\n`;

  // Process each community
  allCommunities.forEach((community) => {
    const { communityName, verified } = community;

    // Add community name and status to the message
    communityStats += `- ${name} - ${verified ? "Verified" : "Unverified"}\n`;

    // Count pending payments if applicable
    // if (paymentConfirmation === "pending") {
    //   pendingPayments++;
    // }
  });

  // Add pending payments info
  // if (pendingPayments > 0) {
  //   communityStats += `\n- Pending payments: ${pendingPayments}\n`;
  // }

  await bot.sendMessage(chatId, communityStats, { parse_mode: "Markdown" });
};
