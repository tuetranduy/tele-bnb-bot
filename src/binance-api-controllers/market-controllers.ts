import { Spot } from "@binance/connector-typescript";

export async function getPrice(client: Spot, ticker: string) {
    const tickerResponse = await client.symbolPriceTicker({ symbol: ticker })
    const price = Array.isArray(tickerResponse) ? tickerResponse[0].price : tickerResponse.price;

    return parseFloat(price);
}