@echo off
title PEOS SYSTEM LAUNCHER
color 0A

echo ========================================
echo PEOS SYSTEM STARTING...
echo ========================================
cd /d "D:\Arif Workspace\Projects\peos"

echo [1/3] Running System Report...
powershell -ExecutionPolicy Bypass -File "scripts\system-report.ps1"

echo [2/3] Starting Health Tracer...
powershell -ExecutionPolicy Bypass -File "scripts\health-trace.ps1"

echo [3/3] Starting PEOS Backend + Frontend...
REM Yahan apna npm start / python app.py ka command lage ga
REM Example: start cmd /k "npm run dev"

echo ========================================
echo PEOS IS LIVE
echo ========================================
pause
