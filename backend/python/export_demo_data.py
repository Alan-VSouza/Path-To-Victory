"""Exports the API's answers for every champion/role/rank in the dataset to a JSON file.

The public demo (frontend built with REACT_APP_DEMO=true) has no Flask server, so it reads
these precomputed answers instead. Run from backend/python after training the model:

    python export_demo_data.py
"""
import json
import pathlib

import pandas as pd

from predict_api_dynamic import app, stats

RANKS = ["", "GRANDMASTER I", "MASTER I", "DIAMOND I", "DIAMOND II", "DIAMOND III", "EMERALD IV",
         "GOLD II", "SILVER II", "BRONZE I", "BRONZE III", "IRON II", "UNRANKED"]
OUT = pathlib.Path(__file__).resolve().parents[2] / "frontend" / "src" / "demo" / "demoData.json"


def main():
    client = app.test_client()
    predictions = {}
    compare = {}
    rows = stats[stats["position"].str.upper() != "INVALID"]
    for _, row in rows.iterrows():
        champ, role = str(row["champion"]), str(row["position"]).upper()
        key = f"{champ.lower()}|{role}"
        compare[key] = {
            "winrate": float(row["winrate"]) if pd.notna(row["winrate"]) else None,
            "sinergia": "" if pd.isna(row.get("meta_insight")) else str(row.get("meta_insight")),
        }
        for rank in RANKS:
            res = client.post("/api/predict", json={"champion": champ, "role": role, "rank": rank})
            predictions[f"{key}|{rank}"] = res.get_json()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"predict": predictions, "compare": compare}, ensure_ascii=False), encoding="utf-8")
    print(f"{len(compare)} champion/role pairs, {len(predictions)} predictions -> {OUT}")


if __name__ == "__main__":
    main()
