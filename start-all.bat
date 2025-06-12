@echo off
REM Inicia o backend Python
start cmd /k "cd backend && python predict_api.py"

REM Inicia o backend Node.js
start cmd /k "cd backend && node server.js"

REM Inicia o frontend React
start cmd /k "cd frontend && npm start"
