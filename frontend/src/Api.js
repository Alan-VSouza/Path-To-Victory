const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

async function post(path, data, fallbackError) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || fallbackError);
  }

  return json;
}

export const predictChampion = (data) => post("/predict", data, "Erro desconhecido ao prever");

export const compareChampions = (data) => post("/compare", data, "Erro desconhecido ao comparar");
