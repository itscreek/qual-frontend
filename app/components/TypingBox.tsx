export default function TypingBox({
  word,
  typedAlphabetsCount,
  isCorrect,
}: {
  word: string;
  typedAlphabetsCount: number;
  isCorrect: boolean;
}) {
  return (
    <div
      style={{
        padding: "10px 20px",
        border: "solid " + (!isCorrect ? "red" : "gray"),
        borderRadius: "5px",
        textAlign: "center",
        transitionDuration: "150ms",
      }}
    >
      <span style={{ color: "white", fontSize: "25px", fontWeight: 200 }}>
          <span style={{ color: "greenyellow", textDecoration: "overline", }}>
            {word.slice(0, typedAlphabetsCount)}
          </span>
          {word.substring(typedAlphabetsCount)}
        </span>
    </div>
  );
}
