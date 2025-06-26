const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/match_results", (req, res) => {
  const filePath = path.join(__dirname, "match_data.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo JSON:", err);
      return res.status(500).json({ error: "Erro ao ler o arquivo de partidas" });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      console.error("Erro no parse do JSON:", parseErr);
      res.status(500).json({ error: "Erro ao processar o arquivo de partidas" });
    }
  });
});

app.listen(PORT, () =>
  console.log(`Servidor backend rodando em http://localhost:${PORT}`)
);
