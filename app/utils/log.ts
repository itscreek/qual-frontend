type LogType = "gameStart" | "gameEnd" | "keyPress";

let logs: Log[] = [];

export interface Log {
  type: LogType;
  timestamp: number;
  data?: KeyPressData;
}

export interface KeyPressData {
  wordToType: string;
  keyPressed: string;
}

export function sendLog(log: Log) {
  logs.push(log);
}

export function getLogs() {
  return logs;
}