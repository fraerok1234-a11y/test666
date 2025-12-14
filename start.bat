@echo off
echo Starting TestApp...
cd /d %~dp0
echo Checking dependencies...
call npm install
echo.
echo Starting web server...
echo Please wait, this may take a minute...
echo.
call npx expo start --web --port 8083
pause



