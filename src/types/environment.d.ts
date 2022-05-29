declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "dev" | "test" | "prod";
    TELEGRAM_TOKEN: string;
  }
}

declare namespace API {
  type HexString = string;

  interface KanyeResponse {
    quote: string;
  }

  interface Scheme {
    colors: HexString[];
  }

  interface ColorSchemeResponse {
    schemes: Scheme[];
  }
}
