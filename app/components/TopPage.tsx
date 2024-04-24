type TopPageProps = {
  isShowing: boolean;
  onGetStartedClick: () => void;
};

export default function TopPage({
  isShowing,
  onGetStartedClick,
}: TopPageProps) {
  return (
    <div
      className="top-page"
      style={{ transform: isShowing ? "none" : "translateY(100vh)" }}
    >
      <div className="logo-container">
        <img src="quantum-computing.png" alt="Quantum Computing" />
        <h1>QuAL</h1>
      </div>
      <h1>Welcome to Quantum Typing!</h1>
      <a className="get-started-button" onClick={onGetStartedClick}>
        Get Started
      </a>
    </div>
  );
}
