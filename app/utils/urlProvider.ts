import urlFallback from "~/config/url-fallback.json";

export class UrlProvider {
  private static instance: UrlProvider;
  private static baseUrl: string = "";
  private static logEndpoint: string = "";
  private static typingWordsEndpoint: string = "";

  private constructor() {
    UrlProvider.baseUrl = import.meta.env.VITE_API_BASE_URL || urlFallback.baseUrl;
    UrlProvider.logEndpoint =
      import.meta.env.VITE_API_LOG_ENDPOINT || urlFallback.logEndpoint;
    UrlProvider.typingWordsEndpoint =
      import.meta.env.VITE_API_TYPING_PROBLEMS_ENDPOINT || urlFallback.typingProblemsEndpoint;
  }
  
  // Singleton pattern
  static getInstance(): UrlProvider {
    if (!UrlProvider.instance) {
      UrlProvider.instance = new UrlProvider();
    }
    return UrlProvider.instance;
  }

  getAPIBaseUrl(): string {
    return UrlProvider.baseUrl;
  }

  getLogAPIUrl(): string {
    return UrlProvider.baseUrl + UrlProvider.logEndpoint;
  }

  getTypingProblemsAPIUrl(): string {
    return UrlProvider.baseUrl + UrlProvider.typingWordsEndpoint;
  }
}
