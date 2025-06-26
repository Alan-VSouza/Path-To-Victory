# 🤖 PathToVictory

**PathToVictory** é uma IA gratuita para League of Legends, focada em partidas Diamante+, que entrega previsões, argumentos, dicas e estatísticas de altíssimo nível para ajudar jogadores a melhorarem seu desempenho em soloQ.

## ✨ O que é o PathToVictory?

- **Previsão de vitória**: Diga seu campeão, elo e posição e veja a probabilidade de vitória, winrate, KDA médio, builds, pontos fortes/fracos e argumentos automáticos.
- **Comparação de campeões**: Compare dois campeões na mesma lane e descubra, com dados reais de alto elo, qual compensa mais no meta.
- **Estatísticas reais**: Dados extraídos de partidas reais de Diamante+, processados por IA e atualizados via pipeline automático.
- **Frontend moderno**: Interface React responsiva, dark mode, com animações e experiência premium.
- **Backend robusto**: API Flask + Node para servir previsões e dados, fácil de rodar localmente.


## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Alan-VSouza/Path-To-Victory.git
cd path-to-victory
```


### 2. Backend Python (Flask)

#### a) Instale as dependências

```bash
cd backend/python
pip install -r requirements.txt
```


#### b) Gere os dados e treine a IA

- Edite `champion_pipeline_simple.py` para os campeões e amostras desejadas.
- Rode para gerar `champion_stats.csv` e `winrates.json`:

```bash
python champion_pipeline_simple.py
```

- Treine o modelo (se necessário):

```bash
python train_model.py
```


#### c) Inicie a API Flask

```bash
python predict_api_dynamic.py
```

A API estará disponível em `http://localhost:5001/api/predict` e `/api/compare`.

### 3. Backend Node (opcional, para servir match_data.json)

```bash
cd ../node
npm install
npm start
```

Acesse em `http://localhost:5000/api/match_results`

### 4. Frontend React

```bash
cd ../../frontend/path-to-victory-react
npm install
npm start
```

Acesse em `http://localhost:3000`

## 🧠 Como foi feito

- **Pipeline de dados**: Python coleta partidas Diamante+ via Riot API, calcula winrate, KDA, builds, banimentos sugeridos, pontos fortes/fracos (traduzidos automaticamente!), e salva tudo pronto para o backend.
- **Machine Learning**: Modelo RandomForest treinado com features de campeão, posição, elo, KDA, etc. para prever vitória/derrota.
- **Backend Flask**: Servindo previsões, argumentos e comparações de campeões via API REST.
- **Frontend React**: UI moderna, responsiva, com formulários, cards de resultado, animações e dark mode.
- **Estilo**: Gradientes, sombras, responsividade e animações para experiência premium.
- **Comparação**: Mensagens inteligentes que destacam o campeão mais vantajoso com base nos dados reais.


## 🎯 Intuito do projeto

- Democratizar estatísticas e previsões de alto nível para jogadores de LoL.
- Mostrar, de forma clara e argumentativa, o "porquê" de cada escolha.
- Incentivar decisões melhores em soloQ com dados reais, não achismo.
- Ser fácil de rodar localmente e servir de base para estudos de IA aplicada a games.


## 🛠️ Tecnologias

- **Python** (pandas, scikit-learn, Flask, googletrans)
- **Node.js** (Express)
- **React** (Hooks, CSS moderno)
- **Riot API** \& **Data Dragon**


## 📸 Screenshots

<p align="center">
  <img src="frontend\src\images\Sc1.png" width="70%" alt="Predict Screenshot"/>
</p>
<p align="center">
  <img src="frontend\src\images\Sc2.png" width="70%" alt="Compare Screenshot"/>
</p>
<p align="center">
  <img src="frontend\src\images\Sc3.png" width="70%" alt="About Screenshot"/>
</p>

## 📚 Créditos e agradecimentos

- Dados: Riot Games API, Data Dragon
- Inspiração: LoLalytics, Mobalytics, u.gg


## 📝 Licença

MIT

> **PathToVictory** — IA e dados para quem quer evoluir no LoL de verdade!
> Sinta-se livre para contribuir, sugerir melhorias ou usar como base para seu próprio projeto.

