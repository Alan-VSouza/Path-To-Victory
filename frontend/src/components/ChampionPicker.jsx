import React from "react";

/* Text input with champion autocomplete (Data Dragon) and a live portrait preview. */
export function ChampionInput({ id, label, value, onChange, champions, placeholder = "Ex.: Ahri" }) {
  const match = champions.find(value);
  const icon = match ? champions.icon(match.id) : null;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className={`champ-input ${match ? "matched" : ""}`}>
        <span className="champ-thumb">
          {icon ? <img src={icon} alt="" /> : <span>{(value.trim()[0] || "?").toUpperCase()}</span>}
        </span>
        <input
          id={id}
          className="input"
          list="champion-list"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          required
        />
        {match && <span className="champ-title">{match.title.charAt(0).toUpperCase() + match.title.slice(1)}</span>}
      </div>
    </div>
  );
}

export function ChampionDatalist({ champions }) {
  return (
    <datalist id="champion-list">
      {champions.list.map((c) => (
        <option key={c.id} value={c.name} />
      ))}
    </datalist>
  );
}

