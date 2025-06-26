export async function predictChampion(data) {
  const response = await fetch("http://localhost:5001/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Erro desconhecido ao prever");
  }

  return json;
}

export async function compareChampions(data) {
  const response = await fetch("http://localhost:5001/api/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Erro desconhecido ao comparar");
  }

  return json;
}
