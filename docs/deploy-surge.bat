@echo off
cd /d "%~dp0"

surge .

if errorlevel 1 (
  echo.
  echo Surge deploy failed. Make sure Surge is installed:
  echo npm install -g surge
  echo.
  echo Then run this script again.
  pause
)
