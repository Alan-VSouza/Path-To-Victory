
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

1. Instale as dependências:
```

pip install requests

```
2. Execute o script Python para coletar os dados:
```

python nome_do_script.py

```
O arquivo `match_data.json` será gerado.

3. (Opcional) Sirva o JSON por uma API Express/Flask, se desejar integração dinâmica com o frontend.

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
script_coleta.py
(outros arquivos do backend)

frontend/
src/
components/
styles/
App.jsx
index.js
...
package.json

```

---

## Observações

- Certifique-se de ter uma chave válida da Riot API.
- O frontend consome os dados do backend via endpoint `/api/match_results`.
- O layout é totalmente responsivo e pode ser customizado em `styles/`.

---
