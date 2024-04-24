import { useState } from "react";
import { useEffect } from "react";
import { sendLog } from "~/utils/log";
import { IoMdCloseCircleOutline } from "react-icons/io";
import TypingBox from "~/components/TypingBox";
import DownloadBox from "~/components/DownloadBox";
import { getTypingWords } from "~/utils/typingWords";

function EndGameButton({ onEndGameClick }: { onEndGameClick: () => void }) {
  return (
    <div className="end-game-box">
      <button onClick={onEndGameClick}>
        <IoMdCloseCircleOutline />
      </button>
    </div>
  );
}

type GamePageProps = {
  isShowing: boolean;
  onEndGameClick: () => void;
};

export default function GamePage({ isShowing, onEndGameClick }: GamePageProps) {
  type GameState = "ready" | "playing" | "finished";
  const [gameState, setGameState] = useState<GameState>("ready");

  const [wordsList, setWordsList] = useState<string[]>(getTypingWords());

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

      if (gameState === "finished") {
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
          setGameState("finished");
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

  function handleEndGameClick() {
    setGameState("ready");
    setCurrentWordIndex(0);
    setTypedAlphabetsCount(0);
    setIsCorrect(true);
  }

  return (
    <div
      className="game-page"
      style={{
        transform: isShowing ? "translateY(-100vh)" : "none",
        transitionDuration: isShowing ? "1.5s" : "0s",
      }}
    >
      <EndGameButton
        onEndGameClick={() => {
          onEndGameClick();
          handleEndGameClick();
        }}
      />
      <TypingBox
        gameState={gameState}
        word={wordsList[currentWordIndex]}
        typedAlphabetsCount={typedAlphabetsCount}
        isCorrect={isCorrect}
      />
      {gameState != "ready" && <DownloadBox />}
    </div>
  );
}