@echo off
REM Inicia o backend Python (Flask)
start cmd /k "cd backend\python && python predict_api_dynamic.py"

REM Inicia o backend Node.js (Express)
start cmd /k "cd backend\node && node server.js"

REM Inicia o frontend React
start cmd /k "cd frontend && npm start"
