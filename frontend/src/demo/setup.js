// Public demo build (REACT_APP_DEMO=true): answers /predict and /compare in the browser with
// the API's precomputed responses (backend/python/export_demo_data.py), so no Flask server is needed.
export const isDemo = process.env.REACT_APP_DEMO === "true";

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5001/api").replace(/\/$/, "");
const NOT_FOUND = "Dados não encontrados para esse campeão/posição.";

let dataPromise;
const loadData = () => (dataPromise ??= import("./demoData.json").then((m) => m.default || m));

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

async function answer(path, body) {
  const data = await loadData();
  const role = String(body.role || body.position || "").trim().toUpperCase();
  if (path.endsWith("/predict")) {
    const key = `${String(body.champion || "").trim().toLowerCase()}|${role}|${String(body.rank || "").trim()}`;
    const hit = data.predict[key];
    return hit ? json({ ...hit, champion: hit.champion }) : json({ error: NOT_FOUND }, 404);
  }
  if (path.endsWith("/compare")) {
    const lookup = (c) => data.compare[`${String(c || "").trim().toLowerCase()}|${role}`] || { error: "Não encontrado" };
    return json({ [body.champion1]: lookup(body.champion1), [body.champion2]: lookup(body.champion2) });
  }
  return json({ error: "Not found" }, 404);
}

if (isDemo) {
  const realFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (!url.startsWith(API_URL + "/")) return realFetch(input, init);
    let body = {};
    try { body = JSON.parse(init?.body || "{}"); } catch { /* keep empty */ }
    await new Promise((r) => setTimeout(r, 250));
    return answer(new URL(url).pathname, body);
  };
}
