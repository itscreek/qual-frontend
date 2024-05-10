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
  private static logAPIUrl: string;
  private static logs: Log[] = [];
  private static readonly MAX_LOGS = 20;

  private constructor() {
    const urlProvider = UrlProvider.getInstance();
    GameLogger.logAPIUrl = urlProvider.getLogAPIUrl();
  }

  static getInstance(): GameLogger {
    if (!GameLogger.instance) {
      GameLogger.instance = new GameLogger();
    }
    return GameLogger.instance;
  }

  pushLog(log: Log) {
    GameLogger.logs.push(log);

    if (
      GameLogger.logs.length > GameLogger.MAX_LOGS ||
      log.type === "gameEnd"
    ) {
      this.sendLogs();
    }
  }

  sendLogs() {
    const logs = { logs: GameLogger.logs };

    fetch(GameLogger.logAPIUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logs),
    }).then(() => {
      GameLogger.logs = [];
    });
  }
}

export function sendLog(log: Log) {
  const gameLogger = GameLogger.getInstance();
  gameLogger.pushLog(log);
}

export function getLogs() {
  return [];
}
