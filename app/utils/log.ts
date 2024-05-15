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

  getTypingTimeData() {
    let words = GameLogger.logs
      .filter((log) => log.type === "keyPress")
      .map((log) => log.data?.wordToType);
    words = [...new Set(words)];

    let typingTimeData = [];
    for (const word of words) {
      const timestamps = GameLogger.logs
        .filter((log) => log.data?.wordToType === word)
        .map((log) => log.timestamp);

      typingTimeData.push({
        word: word,
        time_ms: timestamps[timestamps.length - 1] - timestamps[0],
      });
    }
    GameLogger.logs = [];

    return typingTimeData;
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

export function getTypingTimeData() {
  const gameLogger = GameLogger.getInstance();
  return gameLogger.getTypingTimeData();
}