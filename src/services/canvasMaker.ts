import fs from "fs";
import * as Canvas from "canvas";

import { getColorScheme } from "services/API";

export async function quoteToImage(quote: string): Promise<string> {
  const width = 800;
  const height = 500;
  const canvas = Canvas.createCanvas(width, height);
  const context = canvas.getContext("2d");

  const outputPath = `${__dirname}/${quote}.jpg`;

  const styledQuote = quote
    .replace(/(.*?\s.*?\s*?\s.*?\s.*?\s.*?\s)/g, "$1" + "\n")
    .split("\n");

  const [backgroundColor, textColor] = await getColorScheme();

  context.fillStyle = `#${backgroundColor}`;
  context.fillRect(0, 0, width, height);

  context.font = "bold 40px Arial";
  context.textAlign = "center";

  context.shadowBlur = 5;
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowColor = "black";

  context.fillStyle = `#${textColor}`;

  for (
    let i = 0, initialHeight = height / 2 - styledQuote.length * 6;
    i < styledQuote.length;
    i++
  ) {
    context.fillText(styledQuote[i], width / 2, initialHeight + i * 40);
  }

  const buffer = canvas.toBuffer("image/png");
  fs.writeFile(outputPath, buffer, () => {
    console.log("[CREATED]", outputPath);
  });

  return outputPath;
}
