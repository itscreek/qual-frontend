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
    const correctKeyPressLogs = GameLogger.logs.filter(
      (log) => log.type === "keyPress" && log.data?.isCorrect
    );

    let typingTimeData = [];
    for (let i = 0; i < correctKeyPressLogs.length; ) {
      const log = correctKeyPressLogs[i];
      if (!log.data) {
        i++;
        continue;
      }

      const currentWord = log.data.wordToType;
      typingTimeData.push({
        word: currentWord,
        time:
          correctKeyPressLogs[i + currentWord.length - 1].timestamp -
          log.timestamp,
      });
      i += currentWord.length;
    }

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
