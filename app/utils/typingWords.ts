import { UrlProvider } from "./urlProvider";

export async function getTypingProblems(): Promise<string[]> {
  const urlProvider = UrlProvider.getInstance();
  const typingProblemsEndpoint = urlProvider.getTypingProblemsAPIUrl();
  const response = await fetch(typingProblemsEndpoint);
  const responseJson = await response.json() as any;
  return responseJson.words;
}
