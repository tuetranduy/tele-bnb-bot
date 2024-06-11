import { WizardScene } from "telegraf/scenes";
import { AccountCommand } from "../databases/account";
import { Account } from "../models/account-model";

export const accountWizard = new WizardScene<any>(
    "account-wizard",
    async ctx => {
        ctx.reply("Enter account name: ");
        ctx.wizard.state.data = {};
        return ctx.wizard.next();
    },
    async ctx => {
        await ctx.reply("Enter account api key: ");
        ctx.wizard.state.data.name = ctx.message.text;
        return ctx.wizard.next();
    },
    async ctx => {
        ctx.wizard.state.data.apiKey = ctx.message.text;
        await ctx.reply("Enter account api secret: ");
        return ctx.wizard.next();
    },
    async ctx => {
        ctx.wizard.state.data.apiSecret = ctx.message.text;
        await ctx.reply("Saving account information");
        let account = new Account(ctx.wizard.state.data.name, ctx.wizard.state.data.apiKey, ctx.wizard.state.data.apiSecret);

        const result = await new AccountCommand().add(account);

        await ctx.reply(`Account ${result.name} created successfully`);

        return await ctx.scene.leave();
    },
);
