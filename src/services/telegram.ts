import { Context, Telegraf, Telegram } from "telegraf";

import ImageMaker from "services/imageMaker";
import { quoteToImage } from "services/canvasMaker";
import { getQuote, imageIncludesText } from "services/API";

const Bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const TelegramClient = new Telegram(process.env.TELEGRAM_TOKEN);

Bot.start(replyQuote);
Bot.hears(/kanye|քանյե/i, replyQuote);
Bot.hears("goat", replyQuote);
Bot.hears("ye", replyQuote);
Bot.hears("յէ", replyQuote);
Bot.hears("յե", replyQuote);
Bot.hears("🐐", replyQuote);
Bot.on("photo", async (ctx) => {
  const hasKanye = await imageIncludesText(
    "kanye",
    ctx.message.photo,
    TelegramClient
  );
  if (hasKanye) replyQuote(ctx);
});

async function replyQuote(ctx: Context) {
  const quote = await getQuote();
  const imagePath = await quoteToImage(quote);

  await ctx.replyWithPhoto({ source: imagePath }, { caption: quote });
  ImageMaker.removeImage(imagePath);
}

export default Bot;
