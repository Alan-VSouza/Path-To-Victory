import "./demo/setup"; // must stay first: installs the demo API before the app makes requests
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DemoBanner from "./demo/DemoBanner";
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <DemoBanner />
  </React.StrictMode>
);
