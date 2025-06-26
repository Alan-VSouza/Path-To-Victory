import json
import pandas as pd

with open('match_data.json', 'r', encoding='utf-8') as f:
    partidas = json.load(f)

rows = []
for partida in partidas: 
    for partida_nome, times in partida.items():
        for team_key in ["time_vencedor", "time_perdedor"]:
            vencedor_flag = 1 if team_key == "time_vencedor" else 0
            for p in times[team_key]:
                rows.append({
                    'champion': p.get('champion', ''),
                    'position': p.get('individualPosition', '').upper(),
                    'win': vencedor_flag,
                    'kills': p.get('kills', 0),
                    'deaths': p.get('deaths', 0),
                    'assists': p.get('assists', 0)
                })

df = pd.DataFrame(rows)

grp = df.groupby(['champion', 'position'])
agg = grp.agg(
    sample_size=('win', 'size'),
    winrate=('win', 'mean')
).reset_index()

def kda_ratio(g):
    return ((g['kills'] + g['assists']) / g['deaths'].replace(0, 1)).mean()

kda = grp.apply(kda_ratio).reset_index(name='kda_medio')
stats = pd.merge(agg, kda, on=['champion', 'position'])

for col in ['build_mais_usada', 'bans_recomendados', 'picks_alternativos',
            'pontos_fortes', 'pontos_fracos', 'meta_insight']:
    if col not in stats.columns:
        stats[col] = ''

stats.to_csv('champion_stats.csv', index=False, encoding='utf-8')
print(f"{len(stats)} linhas escritas em champion_stats.csv")
