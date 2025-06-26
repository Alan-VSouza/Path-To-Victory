import json
import pandas as pd

with open('match_data.json', 'r', encoding='utf-8') as f:
    matches = json.load(f)

rows = []
for partida in matches:
    teams = partida.get('teams', {})
    for team_name, players in teams.items():
        vencedor_flag = 1 if team_name.upper() == 'VENCEDOR' else 0
        for p in players:
            kills   = p.get('kills',   0)
            deaths  = p.get('deaths',  0)
            assists = p.get('assists', 0)
            rows.append({
                'champion': p.get('champion', ''),
                'position': p.get('individualPosition', p.get('role','')).upper(),
                'win': vencedor_flag,
                'kills': kills,
                'deaths': deaths,
                'assists': assists
            })

df = pd.DataFrame(rows)

grp = df.groupby(['champion','position'])
agg = grp.agg(
    sample_size=('win','size'),
    winrate=('win','mean')
).reset_index()

def kda_ratio(g):
    return ((g['kills'] + g['assists'])
            / g['deaths'].replace(0,1)).mean()

kda = grp.apply(kda_ratio).reset_index(name='kda_medio')

stats = pd.merge(agg, kda, on=['champion','position'])

stats['winrate']   = stats['winrate'].round(3)
stats['kda_medio'] = stats['kda_medio'].round(2)

for col in ['build_mais_usada','bans_recomendados','picks_alternativos',
            'pontos_fortes','pontos_fracos','meta_insight']:
    stats[col] = ''

stats.to_csv('champion_stats.csv', index=False, encoding='utf-8')
print(f"{len(stats)} linhas escritas em champion_stats.csv")
