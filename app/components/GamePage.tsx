import { useState } from "react";
import { useEffect } from "react";
import { KeyPressData, getLogs, sendLog } from "~/utils/log";

function Ready() {
  return <div>Press "Space" to start.</div>;
}

function TypingBox({
  word,
  typedAlphabetsCount,
}: {
  word: string;
  typedAlphabetsCount: number;
}) {
  return <div>{word}</div>;
}

function DownloadBox() {
  function download() {
    const blob = new Blob([JSON.stringify(getLogs())], { type: "application/json" });
    let downloadLink = document.createElement("a");
    downloadLink.download = "log.json";
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.click();
  }
  return (
    <div>
      <button onClick={download}>Download Log</button>
    </div>
  );
}

function EndGameButton() {
  return <button>End Game</button>;
}

export default function GamePage() {
  type GameState = "ready" | "playing" | "ended";
  const [gameState, setGameState] = useState<GameState>("ready");

  const [wordsList, setWordsList] = useState<string[]>(typingWords);

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  // Indicates how many letters of the current word have been entered.
  const [typedAlphabetsCount, setTypedAlphabetsCount] = useState<number>(0);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (gameState === "ready") {
        if (event.key === " ") {
          setGameState("playing");
          sendLog({ type: "gameStart", timestamp: event.timeStamp });
        }
        return;
      }

      if (gameState === "ended") {
        return;
      }

      const currentWord = wordsList[currentWordIndex];
      sendLog({
        type: "keyPress",
        timestamp: event.timeStamp,
        data: { wordToType: currentWord, keyPressed: event.key },
      });
      if (event.key === currentWord[typedAlphabetsCount]) {
        if (
          typedAlphabetsCount === currentWord.length - 1 &&
          currentWordIndex === wordsList.length - 1
        ) {
          setGameState("ended");
          sendLog({ type: "gameEnd", timestamp: event.timeStamp });
          return;
        }

        if (
          typedAlphabetsCount === currentWord.length - 1 &&
          currentWordIndex < wordsList.length - 1
        ) {
          setCurrentWordIndex(currentWordIndex + 1);
          setTypedAlphabetsCount(0);
          return;
        }

        setTypedAlphabetsCount((prev) => prev + 1);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [gameState, wordsList, currentWordIndex, typedAlphabetsCount]);

  return (
    <div>
      {gameState === "ready" && <Ready />}
      {gameState === "playing" && (
        <TypingBox
          word={wordsList[currentWordIndex]}
          typedAlphabetsCount={typedAlphabetsCount}
        />
      )}
      {gameState === "ended" && <DownloadBox />}
      <EndGameButton />
    </div>
  );
}

const typingWords = ["hello", "world", "apple", "banana"];
