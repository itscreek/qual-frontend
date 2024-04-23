import type { MetaFunction } from "@remix-run/node";
import TopPage from "~/components/TopPage";
import GamePage from "~/components/GamePage";
import { LinksFunction } from "@remix-run/node";
import globalStyle from "~/styles/global.css?url";
import typingBoxStyle from "~/styles/typingBox.css?url";
import downloadBoxStyle from "~/styles/downloadBox.css?url";
import endGameBoxStyle from "~/styles/endGameBox.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyle },
  { rel: "stylesheet", href: typingBoxStyle },
  { rel: "stylesheet", href: downloadBoxStyle },
  { rel: "stylesheet", href: endGameBoxStyle },
];

export const meta: MetaFunction = () => {
  return [{ title: "Quantum Typing" }];
};

export default function Index() {
  return (
    <div id="root">
      <TopPage />
      <GamePage />
    </div>
  );
}
