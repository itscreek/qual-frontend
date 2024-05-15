import { UrlProvider } from "./urlProvider";
import { getTypingTimeData } from "./log";

class TypingProblemsGetter {
  private static instance: TypingProblemsGetter;
  private static typingProblemsEndpoint: string;
  private static sessionId: string | undefined = undefined;

  private constructor() {
    const urlProvider = UrlProvider.getInstance();
    TypingProblemsGetter.typingProblemsEndpoint =
      urlProvider.getTypingProblemsAPIUrl();
  }

  static getInstance(): TypingProblemsGetter {
    if (!TypingProblemsGetter.instance) {
      TypingProblemsGetter.instance = new TypingProblemsGetter();
    }
    return TypingProblemsGetter.instance;
  }

  async getInitialTypingProblems(): Promise<string[]> {
    const response = await fetch(TypingProblemsGetter.typingProblemsEndpoint);
    const responseJson = (await response.json()) as any;
    TypingProblemsGetter.sessionId = responseJson.sid;
    return responseJson.words;
  }

  async getTypingProblems(): Promise<string[]> {
    if (!TypingProblemsGetter.sessionId) {
      throw new Error("Session ID is not set");
    }
    const typingTimeData = getTypingTimeData();
    let queryString = "?sid=" + TypingProblemsGetter.sessionId.toString();
    if (typingTimeData.length > 0) {
      queryString += "&logs=" + JSON.stringify(typingTimeData);
    }
    const url = TypingProblemsGetter.typingProblemsEndpoint + queryString;
    const response = await fetch(url);
    const responseJson = (await response.json()) as any;
    return responseJson.words;
  }

  endSession() {
    if (!TypingProblemsGetter.sessionId) {
      throw new Error("Session ID is not set");
    }
    const url =
      TypingProblemsGetter.typingProblemsEndpoint +
      "?sid=" +
      TypingProblemsGetter.sessionId.toString();
    fetch(url);
    TypingProblemsGetter.sessionId = undefined;
  }
}

export async function getInitialTypingProblems(): Promise<string[]> {
  const typingProblemsGetter = TypingProblemsGetter.getInstance();
  return typingProblemsGetter.getInitialTypingProblems();
}

export async function getTypingProblems(): Promise<string[]> {
  const typingProblemsGetter = TypingProblemsGetter.getInstance();
  return typingProblemsGetter.getTypingProblems();
}

export function endSession() {
  const typingProblemsGetter = TypingProblemsGetter.getInstance();
  typingProblemsGetter.endSession();
}
