
# PathToVictory

Aplicação web fullstack para análise de partidas do League of Legends, integrando dados da API da Riot Games. O sistema coleta informações de partidas ranqueadas, incluindo campeões, posições e elos dos jogadores, e exibe tudo em uma landing page moderna e responsiva.

---

## Funcionalidades

- **Backend em Python**: Coleta dados da Riot API, salva em JSON e pode servir via API REST.
- **Frontend em React**: Exibe partidas, campeões e elos em cards estilizados, com layout responsivo e navbar fixa.
- **Estilos separados por componente**: Organização profissional do CSS para fácil manutenção.
- **Pronto para deploy local ou em nuvem.**

---

## Como rodar

### Backend

1. Entre na pasta backend:
```
cd frontend/backend

```
2. Instale as dependências:
```

npm install

```
3. Execute o servidor:
```

node server.js

```

### Frontend


1. Instale as dependências:
```

npm install

```
2. Inicie o servidor de desenvolvimento:
```

npm start

```
3. Acesse `http://localhost:3000` no navegador.

---

## Estrutura de pastas

```

backend/
match_data.json
server.js

frontend/
src/
components/
styles/
App.jsx
index.js
...

```

---

## Observações

- Certifique-se de ter uma chave válida da Riot API.
- O frontend consome os dados do backend via endpoint `/api/match_results`.
- O layout é totalmente responsivo e pode ser customizado em `styles/`.

---
