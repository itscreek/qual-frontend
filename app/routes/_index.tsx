import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Quantum Typing" },
    { name: "description", content: "Welcome to Quantum Typing!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Quantum Typing!</h1>
    </div>
  );
}
