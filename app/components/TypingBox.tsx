export default function TypingBox({
  gameState,
  word,
  typedAlphabetsCount,
  isCorrect,
}: {
  gameState: "ready" | "playing" | "finished";
  word: string;
  typedAlphabetsCount: number;
  isCorrect: boolean;
}) {
  return (
    <div className="typing-box">
      <h2>Let's type!</h2>
      <div
        style={{
          padding: "10px 20px",
          border: "solid " + (!isCorrect ? "red" : "gray"),
          borderRadius: "5px",
          textAlign: "center",
          transitionDuration: "150ms",
        }}
      >
        {gameState === "ready" && (
          <span style={{ color: "white", fontSize: "25px", fontWeight: 200 }}>
            Press "Space" to start.
          </span>
        )}
        {gameState === "playing" && (
          <span style={{ color: "white", fontSize: "25px", fontWeight: 200 }}>
            <span style={{ color: "greenyellow", textDecoration: "overline" }}>
              {word.slice(0, typedAlphabetsCount)}
            </span>
            {word.substring(typedAlphabetsCount)}
          </span>
        )}
        {gameState === "finished" && (
          <span style={{ color: "white", fontSize: "25px", fontWeight: 650,}}>
            You Finished! 🎉
          </span>
        )}
      </div>
    </div>
  );
}
