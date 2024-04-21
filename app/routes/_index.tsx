import type { MetaFunction } from "@remix-run/node";
import TopPage from "~/components/TopPage";
import GamePage from "~/components/GamePage";

export const meta: MetaFunction = () => {
  return [
    { title: "Quantum Typing" },
  ];
};

export default function Index() {
  return (
    <div>
      <TopPage />
      <GamePage />
    </div>
  );
}
