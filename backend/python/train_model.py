import json
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 1. Carrega os dados do match_data.json
with open('match_data.json', 'r', encoding='utf-8') as f:
    partidas = json.load(f)

# 2. Extrai os dados de cada jogador
rows = []
for partida in partidas: 
    for partida_nome, times in partida.items():
        for team_key in ["time_vencedor", "time_perdedor"]:
            vencedor_flag = 1 if team_key == "time_vencedor" else 0
            for p in times[team_key]:
                rows.append({
                    'champion': p.get('champion', ''),
                    # Usa 'role' se existir, senão 'individualPosition', senão vazio
                    'role': p.get('role', p.get('individualPosition', '')).upper(),
                    'rank': p.get('rank', ''),
                    'kills': p.get('kills', 0),
                    'deaths': p.get('deaths', 0),
                    'assists': p.get('assists', 0),
                    'vencedor': vencedor_flag
                })

df = pd.DataFrame(rows)

# 3. Checa se todas as colunas necessárias existem
required_columns = ['champion', 'role', 'rank', 'kills', 'deaths', 'assists']
missing_cols = [col for col in required_columns if col not in df.columns]
if missing_cols:
    raise ValueError(f"Colunas faltando no DataFrame: {missing_cols}")

# 4. Prepara dados para treino
X = pd.get_dummies(df[required_columns])
y = df['vencedor']

# 5. Split train/test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# 6. Escalona
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 7. Treina modelo
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 8. Avalia
acc = accuracy_score(y_test, model.predict(X_test))
print(f"Acurácia do modelo: {acc:.2f}")

# 9. Salva artefatos para o backend
joblib.dump(model, 'random_forest_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(list(X.columns), 'columns.pkl')
print("Modelo, scaler e colunas salvos!")
