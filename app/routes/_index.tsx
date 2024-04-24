import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { useState } from "react";
import TopPage from "~/components/TopPage";
import GamePage from "~/components/GamePage";
import globalStyle from "~/styles/global.css?url";
import topPageStyle from "~/styles/topPage.css?url";
import gamePageStyle from "~/styles/gamePage.css?url";
import typingBoxStyle from "~/styles/typingBox.css?url";
import downloadBoxStyle from "~/styles/downloadBox.css?url";
import endGameBoxStyle from "~/styles/endGameBox.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyle },
  { rel: "stylesheet", href: topPageStyle },
  { rel: "stylesheet", href: gamePageStyle },
  { rel: "stylesheet", href: typingBoxStyle },
  { rel: "stylesheet", href: downloadBoxStyle },
  { rel: "stylesheet", href: endGameBoxStyle },
];

export const meta: MetaFunction = () => {
  return [{ title: "Quantum Typing" }];
};

export default function Index() {
  const [showingPage, setShowingPage] = useState<"top" | "game">("top");

  return (
    <div id="root">
      <TopPage
        isShowing={showingPage === "top"}
        onGetStartedClick={() => setShowingPage("game")}
      />
      <GamePage
        isShowing={showingPage === "game"}
        onEndGameClick={() => setShowingPage("top")}
      />
    </div>
  );
}
