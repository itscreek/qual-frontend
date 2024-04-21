import { useState } from "react";
import { useEffect } from "react";
import { getLogs, sendLog } from "~/utils/log";
import TypingBox from "~/components/TypingBox";

function Ready() {
  return <div>Press "Space" to start.</div>;
}

function DownloadBox() {
  function download() {
    const blob = new Blob([JSON.stringify(getLogs())], {
      type: "application/json",
    });
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

function EndGameButton({ onEndGameClick }: { onEndGameClick: () => void }) {
  return <button onClick={onEndGameClick}>End Game</button>;
}

export default function GamePage() {
  type GameState = "ready" | "playing" | "ended";
  const [gameState, setGameState] = useState<GameState>("ready");

  const [wordsList, setWordsList] = useState<string[]>(typingWords);

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  // Indicates how many letters of the current word have been entered.
  const [typedAlphabetsCount, setTypedAlphabetsCount] = useState<number>(0);

  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (gameState === "ready") {
        if (event.key === " ") {
          setGameState("playing");
          sendLog({ type: "gameStart", timestamp: Date.now() });
        }
        return;
      }

      if (gameState === "ended") {
        return;
      }

      const currentWord = wordsList[currentWordIndex];
      const isCorrect = event.key === currentWord[typedAlphabetsCount];
      sendLog({
        type: "keyPress",
        timestamp: Date.now(),
        data: {
          wordToType: currentWord,
          keyPressed: event.key,
          isCorrect: isCorrect,
        },
      });
      if (isCorrect) {
        if (
          typedAlphabetsCount === currentWord.length - 1 &&
          currentWordIndex === wordsList.length - 1
        ) {
          setIsCorrect(true);
          setGameState("ended");
          return;
        }

        if (
          typedAlphabetsCount === currentWord.length - 1 &&
          currentWordIndex < wordsList.length - 1
        ) {
          setIsCorrect(true);
          setCurrentWordIndex(currentWordIndex + 1);
          setTypedAlphabetsCount(0);
          return;
        }

        setIsCorrect(true);
        setTypedAlphabetsCount((prev) => prev + 1);
      }

      if (!isCorrect) {
        setIsCorrect(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [gameState, wordsList, currentWordIndex, typedAlphabetsCount, isCorrect]);

  return (
    <div>
      {gameState === "ready" && <Ready />}
      {gameState === "playing" && (
        <TypingBox
          word={wordsList[currentWordIndex]}
          typedAlphabetsCount={typedAlphabetsCount}
          isCorrect={isCorrect}
        />
      )}
      {gameState === "ended" && <DownloadBox />}
      <EndGameButton
        onEndGameClick={() => {
          setGameState("ended");
        }}
      />
    </div>
  );
}

const typingWords = ["hello", "world", "apple", "banana"];
