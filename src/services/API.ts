import fetch from "node-fetch";

const KANYE_URL = "https://api.kanye.rest";
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
