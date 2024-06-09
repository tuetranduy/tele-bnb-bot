import { Spot } from "@binance/connector-typescript";
import axios from "axios";
import * as crypto from "crypto";
import { getPrice } from "./market-controllers";

export async function getMarginEquity(client: Spot) {
  const timestamp = Date.now();
  const queryString = `timestamp=${timestamp}`;
  const signature = encodeURIComponent(crypto.createHmac('sha256', client.apiSecret).update(queryString).digest('hex'));

  try {
    const balanceResponse = await axios.get(
      `https://api.binance.com/sapi/v1/asset/wallet/balance?timestamp=${timestamp}&signature=${signature}`,
      {
        headers: { 'X-MBX-APIKEY': client.apiKey },
      }
    );
    const btcPrice = await getPrice(client, 'BTCUSDT')
    const btcValue = balanceResponse.data.find((x) => x.walletName === 'Cross Margin').balance;
    const usdtValue = btcValue * btcPrice;

    return usdtValue.toFixed(2);
  } catch (error) {
    console.log(error);
  }
}

export async function getMarginLevel(client: Spot) {
  const crossMarginAccountDetailsResponse = await client.getCrossMarginAccountDetails();
  return parseFloat(crossMarginAccountDetailsResponse.marginLevel).toFixed(2);
};

export async function getBorrowedAmount(client: Spot) {
  const crossMarginAccountDetailsResponse = await client.getCrossMarginAccountDetails();
  const totalLiabilityOfBtc = crossMarginAccountDetailsResponse.totalLiabilityOfBtc
  const btcPrice = await getPrice(client, 'BTCUSDT')
  const usdtValue = parseFloat(totalLiabilityOfBtc) * btcPrice;

  return usdtValue.toFixed(2);
};

export async function getMarginBalance(client: Spot) {
  const marginEquity = await getMarginEquity(client);
  const debt = await getBorrowedAmount(client);

  const total = parseFloat(marginEquity) + parseFloat(debt)

  return total.toFixed(2);
}