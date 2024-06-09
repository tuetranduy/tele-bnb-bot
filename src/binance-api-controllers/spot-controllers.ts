import { Spot } from "@binance/connector-typescript";
import { getPrice } from "./market-controllers";

export async function getSpotBalance(client: Spot) {
  const userAssetResponse = await client.userAsset({ needBtcValuation: true });
  const tickerResponse = await client.symbolPriceTicker({ symbol: 'BTCUSDT' })

  const balanceInBtc = userAssetResponse.map(x => x.btcValuation).reduce((a, b) => a + b);
  const btcPrice = await getPrice(client, 'BTCUSDT')

  return parseFloat(balanceInBtc) * btcPrice
};
