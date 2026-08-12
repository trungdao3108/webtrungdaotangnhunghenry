@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   CLEAN INSTALL - Birthday Landing Page
echo ============================================
echo.
echo Close any running Vite/npm terminal first.
echo.

if exist node_modules (
  echo [1/4] Removing old node_modules...
  rd /s /q node_modules
  if exist node_modules (
    echo.
    echo ERROR: node_modules is still locked.
    echo Close VS Code terminals or npm run dev, then run this file again.
    pause
    exit /b 1
  )
) else (
  echo [1/4] node_modules does not exist - OK.
)

if exist package-lock.json (
  echo [2/4] Removing old package-lock.json...
  del /f /q package-lock.json
) else (
  echo [2/4] No old package-lock.json - OK.
)

echo [3/4] Verifying npm cache...
call npm cache verify
if errorlevel 1 (
  echo npm cache verify failed. Continuing with install...
)

echo [4/4] Installing dependencies...
call npm install
if errorlevel 1 (
  echo.
  echo INSTALL FAILED.
  echo Please copy the npm error shown above.
  pause
  exit /b 1
)

echo.
echo ============================================
echo Installation completed successfully.
echo Run: npm run dev
echo ============================================
pause
