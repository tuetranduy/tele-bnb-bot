import { AccountCommand } from "../databases/account";
import { Markup, Scenes, Telegraf } from "telegraf";

export function build(bot: Telegraf<Scenes.WizardContext>) {
    bot.command('account', async (ctx) => {
        return await ctx.reply(
            "Select option",
            Markup.inlineKeyboard([
                Markup.button.callback('Add account', 'add_account'),
                Markup.button.callback('View all accounts', 'view_accounts'),
            ])
        );
    });

    bot.action('add_account', async (ctx) => {
        await ctx.answerCbQuery()
        await ctx.scene.enter('account-wizard');
    });

    bot.action('view_accounts', async (ctx) => {
        await ctx.answerCbQuery()

        const accounts = await new AccountCommand().getAll()

        const replyString = accounts.map(account => {
            console.log(`Account ${account.name}`)
            return `\t \t 👉 <i>Account ID: ${account.id} => <b>${account.name}</b></i> \n`
        })

        return await ctx.replyWithHTML(`
        <strong>Available accounts: </strong> \n ${replyString.join('')}
        `, { parse_mode: 'HTML' })
    });
}