import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PredictForm from "./components/PredictForm";
import CompareForm from "./components/CompareForm";
import About from "./components/About";
import { ChampionDatalist } from "./components/ChampionPicker";
import { useChampions } from "./champions";

function App() {
  const [page, setPage] = useState("predict");
  const champions = useChampions();

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      <main className="main">
        {page === "predict" && <PredictForm champions={champions} />}
        {page === "compare" && <CompareForm champions={champions} />}
        {page === "about" && <About />}
      </main>
      <footer className="footer">
        PathToVictory é um projeto de fã e não é endossado pela Riot Games. League of Legends e suas imagens são
        propriedade da Riot Games, Inc.
      </footer>
      <ChampionDatalist champions={champions} />
    </>
  );
}

export default App;
