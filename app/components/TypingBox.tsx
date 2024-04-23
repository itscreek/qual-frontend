export default function TypingBox({
  gameReady,
  word,
  typedAlphabetsCount,
  isCorrect,
}: {
  gameReady: boolean;
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
        {gameReady && (
          <span style={{ color: "white", fontSize: "25px", fontWeight: 200 }}>
            Press "Space" to start.
          </span>
        )}
        {!gameReady && (
          <span style={{ color: "white", fontSize: "25px", fontWeight: 200 }}>
            <span style={{ color: "greenyellow", textDecoration: "overline" }}>
              {word.slice(0, typedAlphabetsCount)}
            </span>
            {word.substring(typedAlphabetsCount)}
          </span>
        )}
      </div>
    </div>
  );
}
