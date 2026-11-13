import { useEffect, useState } from "react";

const DDRAGON = "https://ddragon.leagueoflegends.com";

export const ROLES = [
  { value: "TOP", label: "Topo" },
  { value: "JUNGLE", label: "Selva" },
  { value: "MIDDLE", label: "Meio" },
  { value: "BOTTOM", label: "Atirador" },
  { value: "UTILITY", label: "Suporte" },
];

export const roleLabel = (value) => ROLES.find((r) => r.value === value)?.label ?? value;

// Champion/position pairs present in the bundled sample dataset (backend/python/champion_stats.csv).
export const SAMPLE_PICKS = {
  TOP: ["Renekton", "Gnar", "Sett", "Malphite", "Jayce", "Sion", "Aurora", "Maokai"],
  JUNGLE: ["Viego", "Kayn", "Hecarim", "JarvanIV", "MasterYi", "Nidalee", "Rammus"],
  MIDDLE: ["Sylas", "Leblanc", "Katarina", "Ryze", "Vex", "Zilean"],
  BOTTOM: ["Kaisa", "Ezreal", "Lucian", "Xayah", "Zeri", "Twitch", "KogMaw"],
  UTILITY: ["Nautilus", "Lulu", "Nami", "Rakan", "Karma", "Alistar", "Yuumi"],
};

let cache = null;

// Loads the champion list from Riot's Data Dragon once; the app keeps working without it.
function loadChampions() {
  if (!cache) {
    cache = fetch(`${DDRAGON}/api/versions.json`)
      .then((r) => r.json())
      .then(async (versions) => {
        const version = versions[0];
        const data = await fetch(`${DDRAGON}/cdn/${version}/data/pt_BR/champion.json`).then((r) => r.json());
        const list = Object.values(data.data)
          .map((c) => ({ id: c.id, name: c.name, title: c.title, tags: c.tags }))
          .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
        return { version, list };
      })
      .catch(() => ({ version: null, list: [] }));
  }
  return cache;
}

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export function useChampions() {
  const [state, setState] = useState({ version: null, list: [] });

  useEffect(() => {
    let alive = true;
    loadChampions().then((data) => alive && setState(data));
    return () => {
      alive = false;
    };
  }, []);

  const find = (input) => {
    const key = normalize(input || "");
    if (!key) return null;
    return state.list.find((c) => normalize(c.id) === key || normalize(c.name) === key) ?? null;
  };

  const icon = (id) => (state.version && id ? `${DDRAGON}/cdn/${state.version}/img/champion/${id}.png` : null);
  const splash = (id) => (id ? `${DDRAGON}/cdn/img/champion/splash/${id}_0.jpg` : null);

  return { ...state, find, icon, splash };
}
