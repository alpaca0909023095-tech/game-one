@echo off
setlocal

cd /d "%~dp0"
set "PORT=8000"
set "URL=http://localhost:%PORT%/index.html"

echo Starting Game One server from:
echo %CD%
echo.
echo Keep this window open while testing the PWA.
echo Game URL:
echo %URL%
echo.
echo Phone frame test URL:
echo http://localhost:%PORT%/test.html
echo.

where py >nul 2>nul
if %errorlevel%==0 (
  py -3 -m http.server %PORT%
  goto :end
)

where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server %PORT%
  goto :end
)

echo Could not find Python from py or python.
echo Please install Python, or start a static server in this folder.
pause

:end
endlocal
