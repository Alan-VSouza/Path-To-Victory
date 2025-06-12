from flask_cors import CORS
import joblib
import pandas as pd
from flask import Flask, request, jsonify

model = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')
columns = joblib.load('columns.pkl')

app = Flask(__name__)
CORS(app) 

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame([data])
    df_encoded = pd.get_dummies(df)
    for col in columns:
        if col not in df_encoded:
            df_encoded[col] = 0
    df_encoded = df_encoded[columns]
    X = scaler.transform(df_encoded)
    pred = model.predict(X)
    return jsonify({'vencedor': int(pred[0])})

if __name__ == '__main__':
    app.run(port=5001)
