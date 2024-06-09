import { BinanceAPI } from "src/binance-api-controllers";
import { Markup, Telegraf } from "telegraf";

export function build(bot: Telegraf, binanceApi: BinanceAPI) {
    bot.command('balance', (ctx) => {
        return ctx.reply('<b>Spot</b> or <b>Margin?</b>', {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard([
                Markup.button.callback('Spot', 'Spot'),
                Markup.button.callback('Margin', 'Margin'),

            ])
        })
    })

    bot.action('Spot', async (ctx) => {
        await ctx.answerCbQuery()

        const data = await binanceApi.getSpotBalance();
        return await ctx.reply(`Spot Balance: ${data.toString()} USDT`)
    });

    bot.action('Margin', async (ctx) => {
        await ctx.answerCbQuery()

        const marginEquity = await binanceApi.getMarginEquity();
        const marginLevel = await binanceApi.getMarginLevel();
        const borrowedAmount = await binanceApi.getBorrowedAmount();
        const marginBalance = await binanceApi.getMarginBalance();

        return await ctx.replyWithHTML(`
            <strong>Margin Account Info</strong>
            <i>Margin Balance: <b>${marginEquity.toString()}</b> USDT</i>
            <i>Borrowed/Debt: <b>${borrowedAmount.toString()}</b> USDT</i>
            <i>Margin Balance: <b>${marginBalance.toString()}</b> USDT</i>
            <i>Margin Level: <b>${marginLevel.toString()}</b></i>
            `, { parse_mode: 'HTML' })
    });
}