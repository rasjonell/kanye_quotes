import path from "path";
import fetch from "node-fetch";

import { Telegram } from "telegraf";
import { PhotoSize } from "telegraf/typings/core/types/typegram";

const KANYE_URL = "https://api.kanye.rest";
const OCR_URL = "https://api.ocr.space/parse/imageurl";
const COLOR_URL = "https://www.colr.org/json/schemes/random/1";

export async function getQuote() {
  try {
    const response = await fetch(KANYE_URL);
    const data: API.KanyeResponse = await response.json();
    return data.quote;
  } catch (error) {
    return "Whoopity scoop";
  }
}

export async function getColorScheme(): Promise<
  [API.HexString, API.HexString]
> {
  try {
    const response = await fetch(COLOR_URL);
    const data: API.ColorSchemeResponse = await response.json();
    const colors = data.schemes[0].colors;
    const scheme = [colors[0], colors[colors.length - 1]] as [
      API.HexString,
      API.HexString
    ];

    return scheme;
  } catch (error) {
    return ["ffef62", "ab003c"];
  }
}

export async function imageIncludesText(
  text: string,
  photos: PhotoSize[],
  TelegramClient: Telegram
): Promise<boolean> {
  const API_KEY = process.env.OCR_TOKEN;

  const photoMeta = photos[photos.length - 1];
  const photoData = await TelegramClient.getFileLink(photoMeta.file_id);
  const fileExtension = path.extname(photoData.pathname);

  const URL = `${OCR_URL}?apikey=${API_KEY}&filetype=${fileExtension}&url=${photoData.href}`;
  const OCR = await fetch(URL);
  const data = await OCR.json();

  console.log(data.ParsedResults);
  return data.ParsedResults[0].ParsedText.toLowerCase().includes(text);
}
