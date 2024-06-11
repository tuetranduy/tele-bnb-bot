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
}