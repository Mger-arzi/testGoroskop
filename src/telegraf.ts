import { Telegraf } from 'telegraf';

const token = `7177162493:AAFxq4PukFzNdj2J1L0rGnMx-PTAGzuetBk`
const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply('Hello! This is a Telegram Mini App.');
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
