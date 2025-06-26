import time
import requests
import json
import pandas as pd
import os
from collections import Counter
from googletrans import Translator

API_KEY       = "RGAPI-aeb17231-a5f0-4813-87d6-4126c1593a7f"
HEADERS       = {'X-Riot-Token': API_KEY}
REGION_LEAGUE = 'br1'
REGION_MATCH  = 'americas'
QUEUE         = 'RANKED_SOLO_5x5'
TIER          = 'DIAMOND'
DIVISION      = 'I'

SAMPLE_PLAYERS = 5  
SAMPLE_MATCHES = 10


translator = Translator()

def get_champion_name_map():
    url = "https://ddragon.leagueoflegends.com/cdn/15.13.1/data/en_US/champion.json"
    data = requests.get(url).json()['data']
    id_to_name = {}
    for v in data.values():
        id_to_name[int(v['key'])] = v['id']
    return id_to_name

def traduzir_lista(lista_en):
    if not lista_en:
        return []
    if isinstance(lista_en, str):
        lista_en = [s.strip() for s in lista_en.split(";") if s.strip()]
    traduzidas = []
    for frase in lista_en:
        try:
            traduzida = translator.translate(frase, src='en', dest='pt').text
        except Exception:
            traduzida = frase 
        traduzidas.append(traduzida)
    return traduzidas


def get_item_name_map():
    url = "https://ddragon.leagueoflegends.com/cdn/15.13.1/data/en_US/item.json"
    data = requests.get(url).json()['data']
    return {int(k): v['name'] for k, v in data.items()}

CHAMP_ID_TO_NAME = get_champion_name_map()
ITEM_ID_TO_NAME = get_item_name_map()

def safe_request(url, params=None):
    while True:
        r = requests.get(url, headers=HEADERS, params=params)
        if r.status_code == 429:
            wait = int(r.headers.get('Retry-After', 1))
            print(f"[429] Aguarde {wait}s...")
            time.sleep(wait)
            continue
        r.raise_for_status()
        return r.json()

def get_diamond_puuids():
    url = (f"https://{REGION_LEAGUE}.api.riotgames.com"
           f"/lol/league/v4/entries/{QUEUE}/{TIER}/{DIVISION}")
    data = safe_request(url)
    return [e['puuid'] for e in data][:SAMPLE_PLAYERS]

def get_matches(puuid):
    url = (f"https://{REGION_MATCH}.api.riotgames.com"
           f"/lol/match/v5/matches/by-puuid/{puuid}/ids")
    return safe_request(url, params={'start': 0, 'count': SAMPLE_MATCHES})

def get_match_detail(match_id):
    url = (f"https://{REGION_MATCH}.api.riotgames.com"
           f"/lol/match/v5/matches/{match_id}")
    return safe_request(url)

def compute_kda_and_builds_and_bans(champion_name, puuids):
    kills = deaths = assists = games = 0
    build_counter = Counter()
    ban_counter = Counter()
    for puuid in puuids:
        ids = get_matches(puuid)
        for mid in ids:
            detail = get_match_detail(mid)
            for p in detail['info']['participants']:
                if p['championName'].lower() == champion_name.lower():
                    games += 1
                    kills += p.get('kills', 0)
                    deaths += p.get('deaths', 0)
                    assists += p.get('assists', 0)
                    build = tuple([p.get(f'item{i}', 0) for i in range(6) if p.get(f'item{i}', 0) > 0])
                    if build:
                        build_counter[build] += 1
                    for team in detail['info'].get('teams', []):
                        for ban in team.get('bans', []):
                            ban_counter[ban.get('championId')] += 1
                    break
    kda = round((kills + assists) / max(deaths, 1), 2) if games else 0
    build_mais_usada = []
    if build_counter:
        build_mais_usada = [ITEM_ID_TO_NAME.get(i, str(i)) for i in build_counter.most_common(1)[0][0]]
    bans_recomendados = [CHAMP_ID_TO_NAME.get(b, str(b)) for b, _ in ban_counter.most_common(3)]
    return kda, ";".join(build_mais_usada), ";".join(bans_recomendados)

def get_champion_tips(champion_name):
    url = f"https://ddragon.leagueoflegends.com/cdn/15.13.1/data/en_US/champion/{champion_name}.json"
    data = requests.get(url).json()
    champ_data = data['data'][champion_name]
    pontos_fortes_en = champ_data.get('allytips', [])
    pontos_fracos_en = champ_data.get('enemytips', [])
    pontos_fortes_pt = traduzir_lista(pontos_fortes_en)
    pontos_fracos_pt = traduzir_lista(pontos_fracos_en)
    return ";".join(pontos_fortes_pt), ";".join(pontos_fracos_pt)


def compute_winrate(champion_name, puuids):
    wins = games = 0
    for puuid in puuids:
        ids = get_matches(puuid)
        for mid in ids:
            detail = get_match_detail(mid)
            for p in detail['info']['participants']:
                if p['championName'].lower() == champion_name.lower():
                    games += 1
                    if p['win']:
                        wins += 1
                    break
    return (wins, games)

def update_champion_stats_csv(results, position="TOP"):
    csv_file = "champion_stats.csv"
    if os.path.exists(csv_file):
        df = pd.read_csv(csv_file)
    else:
        df = pd.DataFrame(columns=[
            "champion", "position", "winrate", "sample_size",
            "kda_medio", "build_mais_usada", "bans_recomendados",
            "picks_alternativos", "pontos_fortes", "pontos_fracos", "meta_insight"
        ])

    for champ, data in results.items():
        mask = (df["champion"].str.lower() == champ.lower()) & (df["position"] == position)
        winrate = data.get('winrate')
        sample_size = data.get('games_analisados')
        kda_medio = data.get('kda_medio', '')
        build_mais_usada = data.get('build_mais_usada', '')
        bans_recomendados = data.get('bans_recomendados', '')
        pontos_fortes = data.get('pontos_fortes', '')
        pontos_fracos = data.get('pontos_fracos', '')
        picks_alternativos = data.get('picks_alternativos', '')
        meta_insight = data.get('meta_insight', '')

        if mask.any():
            df.loc[mask, "winrate"] = winrate
            df.loc[mask, "sample_size"] = sample_size
            df.loc[mask, "kda_medio"] = kda_medio
            df.loc[mask, "build_mais_usada"] = build_mais_usada
            df.loc[mask, "bans_recomendados"] = bans_recomendados
            df.loc[mask, "pontos_fortes"] = pontos_fortes
            df.loc[mask, "pontos_fracos"] = pontos_fracos
            df.loc[mask, "picks_alternativos"] = picks_alternativos
            df.loc[mask, "meta_insight"] = meta_insight
        else:
            new_row = {
                "champion": champ,
                "position": position,
                "winrate": winrate,
                "sample_size": sample_size,
                "kda_medio": kda_medio,
                "build_mais_usada": build_mais_usada,
                "bans_recomendados": bans_recomendados,
                "picks_alternativos": picks_alternativos,
                "pontos_fortes": pontos_fortes,
                "pontos_fracos": pontos_fracos,
                "meta_insight": meta_insight
            }
            df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
    df.to_csv(csv_file, index=False, encoding="utf-8")
    print(f"Arquivo {csv_file} atualizado!")

if __name__ == "__main__":
    champions = ["Renekton", "Sion"]  
    puuids = get_diamond_puuids()
    results = {}
    for champ in champions:
        print(f"Calculando dados de {champ}...")
        wins, games = compute_winrate(champ, puuids)
        winrate = round(wins / games, 3) if games else None
        kda, build_mais_usada, bans_recomendados = compute_kda_and_builds_and_bans(champ, puuids)
        pontos_fortes, pontos_fracos = get_champion_tips(champ)
        results[champ] = {
            'games_analisados': games,
            'winrate': winrate,
            'kda_medio': kda,
            'build_mais_usada': build_mais_usada,
            'bans_recomendados': bans_recomendados,
            'pontos_fortes': pontos_fortes,
            'pontos_fracos': pontos_fracos
        }

    with open("winrates.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("Arquivo winrates.json salvo!")

    update_champion_stats_csv(results, position="TOP")
    print(json.dumps(results, ensure_ascii=False, indent=2))
