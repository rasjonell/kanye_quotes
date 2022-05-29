import fs from "fs";
import Jimp from "jimp";

type ImageURL = string;

export default { quoteToImage, removeImage };

async function quoteToImage(
  pathToImage: ImageURL,
  quote: string
): Promise<ImageURL> {
  const image = await Jimp.read(pathToImage);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  const outputPath = `${__dirname}/${quote}.jpg`;

  image.print(
    font,
    image.bitmap.width / 4,
    550,
    {
      text: quote,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    image.bitmap.width / 2,
    image.bitmap.height / 4
  );

  await image.writeAsync(outputPath);

  return outputPath;
}

function removeImage(pathToImage: ImageURL): void {
  fs.rm(pathToImage, () => {
    console.log("[REMOVED]", pathToImage);
  });
}
