import { UrlProvider } from "./urlProvider";

type LogType = "gameStart" | "gameEnd" | "keyPress";

export interface Log {
  type: LogType;
  timestamp: number;
  data?: KeyPressData;
}

export interface KeyPressData {
  wordToType: string;
  keyPressed: string;
  isCorrect: boolean;
}

class GameLogger {
  private static instance: GameLogger;
  private static logs: Log[] = [];

  private constructor() {}

  static getInstance(): GameLogger {
    if (!GameLogger.instance) {
      GameLogger.instance = new GameLogger();
    }
    return GameLogger.instance;
  }

  pushLog(log: Log) {
    GameLogger.logs.push(log);
  }

  getLogs() {
    return GameLogger.logs;
  }
}

export function sendLog(log: Log) {
  const gameLogger = GameLogger.getInstance();
  gameLogger.pushLog(log);
}

export function getLogs() {
  const gameLogger = GameLogger.getInstance();
  return gameLogger.getLogs();
}
