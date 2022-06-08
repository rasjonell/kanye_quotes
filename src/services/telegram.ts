import { Context, Telegraf } from "telegraf";

import { getQuote } from "services/API";
import ImageMaker from "services/imageMaker";
import { quoteToImage } from "services/canvasMaker";

const Bot = new Telegraf(process.env.TELEGRAM_TOKEN);

Bot.start(replyQuote);
Bot.hears(/kanye|քանյե/i, replyQuote);
Bot.hears.('goat', replyQuote)
Bot.hears.('ye', replyQuote)
Bot.hears.('յէ', replyQuote)
Bot.hears.('յե', replyQuote)
Bot.hears.('🐐', replyQuote)

async function replyQuote(ctx: Context) {
  const quote = await getQuote();
  const imagePath = await quoteToImage(quote);

  await ctx.replyWithPhoto({ source: imagePath }, { caption: quote });
  ImageMaker.removeImage(imagePath);
}

export default Bot;
