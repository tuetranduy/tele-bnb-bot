import { BinanceAPI } from "./binance-api-controllers";
import { Markup, Telegraf } from "telegraf";

import { build as registerBalance } from "./bot-controllers/balance";
import { Constants } from "./constants";

import { load } from 'ts-dotenv';

const env = load({
    BINANCE_API_KEY: String,
    BINANCE_API_SECRET: String,
    TELEGRAM_BOT_API_KEY: String
})

const apiKey = env.BINANCE_API_KEY;
const apiSecret = env.BINANCE_API_SECRET;
const bot = new Telegraf(env.TELEGRAM_BOT_API_KEY);
const binanceApi = new BinanceAPI(apiKey, apiSecret);

bot.start(async (ctx) => {
    await bot.telegram.setMyCommands([
        {
            command: '/balance',
            description: 'get balance',
        }
    ])
    return await ctx.reply('Please choose command', Markup
        .keyboard([
            [Constants.CMD_BALANCE]
        ])
        .persistent(false)
        .oneTime()
        .resize()
    )
});

bot.use(Telegraf.log())

registerBalance(bot, binanceApi);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
