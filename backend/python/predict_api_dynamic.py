from flask_cors import CORS
from flask import Flask, request, jsonify
import pandas as pd
import joblib

def split_list_field(val):
    txt = str(val) if pd.notna(val) else ""
    return [item.strip() for item in txt.split(";") if item.strip()]

def safe_str(val):
    return "" if (val is None or (isinstance(val, float) and pd.isna(val))) else str(val)

model   = joblib.load("random_forest_model.pkl")
scaler  = joblib.load("scaler.pkl")
columns = joblib.load("columns.pkl")
stats   = pd.read_csv("champion_stats.csv")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.json or {}
    champ = data.get("champion","").strip()
    role  = (data.get("role") or data.get("position") or "").strip().upper()

    row = stats[
        (stats["champion"].str.lower() == champ.lower()) &
        (stats["position"].str.upper() == role)
    ]
    if row.empty:
        return jsonify({"error":"Dados não encontrados para esse campeão/posição."}), 404
    s = row.iloc[0]

    payload = {
        'champion': champ,
        'role': role,
        'rank': safe_str(data.get("rank","")),
        'kills': data.get("kills",0),
        'deaths': data.get("deaths",0),
        'assists': data.get("assists",0)
    }
    df_enc = pd.get_dummies(pd.DataFrame([payload]))
    for col in columns:
        if col not in df_enc: df_enc[col] = 0
    for col in list(df_enc.columns):
        if col not in columns: df_enc.drop(col, axis=1, inplace=True)
    df_enc = df_enc[columns]
    X = scaler.transform(df_enc)
    pred = int(model.predict(X)[0])

    pontos_fortes      = split_list_field(s["pontos_fortes"])
    pontos_fracos      = split_list_field(s["pontos_fracos"])
    bans_recomendados  = split_list_field(s["bans_recomendados"])
    picks_alternativos = split_list_field(s["picks_alternativos"])
    build_mais_usada   = split_list_field(s["build_mais_usada"])
    winrate            = float(s["winrate"]) if pd.notna(s["winrate"]) else None
    sample_size        = int(s["sample_size"]) if pd.notna(s["sample_size"]) else None
    kda_medio          = float(s["kda_medio"]) if pd.notna(s["kda_medio"]) else None
    meta_insight       = safe_str(s.get("meta_insight"))

    return jsonify({
        "vencedor": pred,
        "winrate": winrate,
        "sample_size": sample_size,
        "pontos_fortes": pontos_fortes,
        "pontos_fracos": pontos_fracos,
        "bans_recomendados": bans_recomendados,
        "picks_alternativos": picks_alternativos,
        "ajustes_build": f"Builds recomendadas: {safe_str(s['build_mais_usada'])}",
        "estatisticas": {
            "kda_medio": kda_medio,
            "build_mais_usada": build_mais_usada
        },
        "meta_insight": meta_insight,
        "explicacao": (
            f"Sua escolha de {champ} {role} tem winrate de "
            f"{(winrate*100) if winrate is not None else '–'}% em "
            f"{sample_size if sample_size is not None else '–'} partidas."
        )
    })

@app.route("/api/compare", methods=["POST"])
def compare():
    data = request.json or {}
    c1 = data.get("champion1", "")
    c2 = data.get("champion2", "")
    role = (data.get("position") or data.get("role") or "").strip().upper()

    def lookup(champ):
        row = stats[
            (stats["champion"].str.lower() == champ.lower()) &
            (stats["position"].str.upper() == role)
        ]
        if row.empty:
            return {"error": "Não encontrado"}
        r = row.iloc[0]
        return {
            "winrate": float(r["winrate"]) if pd.notna(r["winrate"]) else None,
            "sinergia": safe_str(r.get("meta_insight"))
        }

    return jsonify({c1: lookup(c1), c2: lookup(c2)})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
