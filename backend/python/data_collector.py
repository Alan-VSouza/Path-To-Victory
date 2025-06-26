import requests
import pandas as pd

DD_VERSION = "15.13.1"
url_champ = f"https://ddragon.leagueoflegends.com/cdn/{DD_VERSION}/data/en_US/champion.json"
resp = requests.get(url_champ).json()
champs = resp["data"]

rows = []
for key, info in champs.items():
    name = info["id"]
    for pos in ["TOP","JUNGLE","MIDDLE","BOTTOM","UTILITY"]:
        rows.append({
            "champion": name,
            "position": pos,
            "winrate": 0.50,
            "sample_size": 0,
            "kda_medio": 0.0,
            "build_mais_usada": "",
            "bans_recomendados": "",
            "picks_alternativos": "",
            "pontos_fortes": "",
            "pontos_fracos": "",
            "meta_insight": ""
        })

df = pd.DataFrame(rows)
df.to_csv("champion_stats.csv", index=False)
df.to_json("champion_stats.json", orient="records", force_ascii=False)
print("Dados iniciais salvos em champion_stats.csv / .json")
