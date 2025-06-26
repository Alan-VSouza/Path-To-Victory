import pandas as pd
import joblib
import json
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

with open('match_data.json', 'r', encoding='utf-8') as f:
    all_results = json.load(f)

# 2) Extrai dados de cada jogador
data = []
for match in all_results:
    teams = match.get("teams", {})
    for team_name, players in teams.items():
        vencedor = 1 if team_name.upper()=="VENCEDOR" else 0
        for p in players:
            kda = p.get("kda","0/0/0").split("/")
            kills, deaths, assists = map(int, kda) if len(kda)==3 else (0,0,0)
            data.append({
                'champion': p.get('champion'),
                'role': p.get('role'),
                'rank': p.get('rank'),
                'kills': kills,
                'deaths': deaths,
                'assists': assists,
                'vencedor': vencedor
            })

df = pd.DataFrame(data)

# 3) One-hot e separa X/y
X = pd.get_dummies(df[['champion','role','rank','kills','deaths','assists']])
y = df['vencedor']

# 4) Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# 5) Escalona
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

# 6) Treina
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 7) Avalia
acc = accuracy_score(y_test, model.predict(X_test))
print(f"Acurácia do modelo: {acc:.2f}")

# 8) Salva artefatos para o backend
joblib.dump(model,   'random_forest_model.pkl')
joblib.dump(scaler,  'scaler.pkl')
joblib.dump(list(X.columns), 'columns.pkl')
print("Modelo, scaler e colunas salvos!")
