import { UrlProvider } from "./urlProvider";
import { getTypingTimeData } from "./log";

class TypingProblemsGetter {
  private static instance: TypingProblemsGetter;
  private static typingProblemsEndpoint: string;
  private static sessionId: string | undefined = undefined;

  private constructor() {
    const urlProvider = UrlProvider.getInstance();
    TypingProblemsGetter.typingProblemsEndpoint = urlProvider.getTypingProblemsAPIUrl();
  }

  static getInstance(): TypingProblemsGetter {
    if (!TypingProblemsGetter.instance) {
      TypingProblemsGetter.instance = new TypingProblemsGetter();
    }
    return TypingProblemsGetter.instance;
  }

  async getTypingProblems(): Promise<string[]> {
    if (!TypingProblemsGetter.sessionId) {
      const response = await fetch(TypingProblemsGetter.typingProblemsEndpoint);
      const responseJson = await response.json() as any;
      TypingProblemsGetter.sessionId = responseJson.sid;
      return responseJson.words;
    }
    const typingTimeData = getTypingTimeData();
    let queryString = "?sid=" + TypingProblemsGetter.sessionId.toString();
    if (typingTimeData.length > 0) {
      queryString += "&logs=" + JSON.stringify(typingTimeData);
    }
    const url = TypingProblemsGetter.typingProblemsEndpoint + queryString;
    const response = await fetch(url);
    const responseJson = await response.json() as any;
    return responseJson.words;
  }
}

export async function getTypingProblems(): Promise<string[]> {
  const typingProblemsGetter = TypingProblemsGetter.getInstance();
  return typingProblemsGetter.getTypingProblems();
}
