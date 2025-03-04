import axios from "axios";

export const convertPrice = async (USDAmount) => {
  try {
    // Fetch the ETH price in USD from CoinGecko
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const ethPriceInUSD = response.data.ethereum.usd;

    // Calculate the equivalent ETH amount for the given USD amount
    const ethAmount = USDAmount / ethPriceInUSD;

    // Return the ETH amount as a string with up to 18 decimal places for precision
    return ethAmount.toFixed(18);
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    throw error; // Ensure the error is propagated
  }
};
