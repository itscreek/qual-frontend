import { useState } from "react";
import { useEffect } from "react";

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
  return <div>Download</div>;
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
        }
        return;
      }

      if (gameState === "ended") {
        return;
      }

      const currentWord = wordsList[currentWordIndex];
      if (event.key === currentWord[typedAlphabetsCount]) {
        if (typedAlphabetsCount === currentWord.length - 1) {
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
