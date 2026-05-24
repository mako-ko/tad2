@echo off
chcp 65001 >nul
copy .env.example .env >nul 2>nul
if not exist .env copy .env.example .env
docker compose -f compose.yml up --build
