import React from "react";
import { ROLES } from "../champions";
import { RoleIcon } from "./Icons";

/* Lane picker rendered as icon buttons (radio group). */
export default function RoleSelect({ value, onChange, label = "Posição" }) {
  return (
    <div className="field">
      <span className="field-label">{label}</span>
      <div className="role-select" role="radiogroup" aria-label={label}>
        {ROLES.map((r) => (
          <button
            key={r.value}
            type="button"
            role="radio"
            aria-checked={value === r.value}
            data-role={r.value}
            className={value === r.value ? "active" : ""}
            onClick={() => onChange(r.value)}
          >
            <RoleIcon role={r.value} />
            <span>{r.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

