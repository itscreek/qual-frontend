import type { MetaFunction } from "@remix-run/node";
import TopPage from "~/components/TopPage";
import GamePage from "~/components/GamePage";
import { LinksFunction } from "@remix-run/node";
import globalStyle from "~/styles/global.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: globalStyle }];

export const meta: MetaFunction = () => {
  return [
    { title: "Quantum Typing" },
  ];
};

export default function Index() {
  return (
    <div id="root">
      <TopPage />
      <GamePage />
    </div>
  );
}
