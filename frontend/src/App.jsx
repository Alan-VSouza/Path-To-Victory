import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PredictForm from "./components/PredictForm";
import CompareForm from "./components/CompareForm";
import About from "./components/About";
import "./styles/App.css";

function App() {
  const [page, setPage] = useState("predict");

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      <main className="main-content">
        {page === "predict" && <PredictForm />}
        {page === "compare" && <CompareForm />}
        {page === "about" && <About />}
      </main>
    </>
  );
}

export default App;
