import { Spot } from "@binance/connector-typescript";
import { getSpotBalance } from "./spot-controllers";
import { getBorrowedAmount, getMarginBalance, getMarginEquity, getMarginLevel } from "./margin-controllers";

export class BinanceAPI {
  apiKey: string;
  apiSecret: string;
  client: Spot;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.client = new Spot(apiKey, apiSecret);
  }

  async getSpotBalance() {
    return await getSpotBalance(this.client);
  }

  async getMarginEquity() {
    return await getMarginEquity(this.client);
  }

  async getMarginLevel() {
    return await getMarginLevel(this.client);
  }

  async getBorrowedAmount() {
    return await getBorrowedAmount(this.client);
  }

  async getMarginBalance() {
    return await getMarginBalance(this.client);
  }
};
