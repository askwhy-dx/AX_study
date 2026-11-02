@echo off
REM ---------------------------------------------------------------
REM  basic trial instructor demo : sub
REM  Demo folder = test\AX_study\basic\<trial>\basic_demo (moved 2026-10-06).
REM  The Korean folder name is found with for /d (this file must stay ASCII).
REM  .vscode\tasks_sub.json is copied to tasks.json, and VS Code runs it
REM  on folder open = claude "/basic-trial-demo sub" in the terminal.
REM  Close any VS Code window already showing basic_demo first.
REM ---------------------------------------------------------------

set "TARGET="
for /d %%D in ("C:\Users\User\Desktop\test\AX_study\basic\*") do if exist "%%D\basic_demo\.vscode\" set "TARGET=%%D\basic_demo"
set "VSCODE=C:\Users\User\AppData\Local\Programs\Microsoft VS Code\Code.exe"

if not defined TARGET goto :nofolder
if not exist "%VSCODE%" goto :nocode
copy /y "%TARGET%\.vscode\tasks_sub.json" "%TARGET%\.vscode\tasks.json" >nul
start "" "%VSCODE%" -n "%TARGET%"
exit /b 0

:nofolder
echo Demo folder not found under C:\Users\User\Desktop\test\AX_study\basic
pause
exit /b 1

:nocode
echo VS Code was not found at: %VSCODE%
pause
exit /b 1
