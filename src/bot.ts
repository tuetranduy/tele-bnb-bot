import { BinanceAPI } from "./binance-api-controllers";
import { Markup, Scenes, Telegraf, session } from "telegraf";

import { build as registerBalance } from "./bot-controllers/balance";
import { build as registerAccount } from "./bot-controllers/account";
import { accountWizard } from "./bot-controllers/account-wizard";
import { Constants } from "./constants";

import { load } from 'ts-dotenv';
import { Stage, WizardScene } from "telegraf/scenes";

const env = load({
    BINANCE_API_KEY: String,
    BINANCE_API_SECRET: String,
    TELEGRAM_BOT_API_KEY: String
})

const apiKey = env.BINANCE_API_KEY;
const apiSecret = env.BINANCE_API_SECRET;
const bot = new Telegraf<Scenes.WizardContext>(env.TELEGRAM_BOT_API_KEY);
const binanceApi = new BinanceAPI(apiKey, apiSecret);

const stage = new Stage([accountWizard]);

bot.start(async (ctx) => {
    await bot.telegram.setMyCommands([
        {
            command: '/balance',
            description: 'get balance',
        },
        {
            command: '/account',
            description: 'account management',
        }
    ]);

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
bot.use(session());
bot.use(stage.middleware());

registerBalance(bot, binanceApi);
registerAccount(bot);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
