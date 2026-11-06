@echo off
REM ---------------------------------------------------------------
REM  advance 2step instructor demo : sub
REM  Demo folder = test\AX_study\advance\2step\adv2_demo\cs_practice
REM  Skill = test\AX_study\.claude\skills\adv2-demo
REM  .vscode\tasks_sub.json is copied to tasks.json, and VS Code runs it
REM  on folder open = claude "/adv2-demo sub" in the terminal.
REM  Close any VS Code window already showing cs_practice first.
REM ---------------------------------------------------------------
set "TARGET=C:\Users\User\Desktop\test\AX_study\advance\2step\adv2_demo\cs_practice"
set "VSCODE=C:\Users\User\AppData\Local\Programs\Microsoft VS Code\Code.exe"
if not exist "%TARGET%\.vscode\" goto :nofolder
if not exist "%VSCODE%" goto :nocode
copy /y "%TARGET%\.vscode\tasks_sub.json" "%TARGET%\.vscode\tasks.json" >nul
start "" "%VSCODE%" -n "%TARGET%"
exit /b 0

:nofolder
echo Demo folder not found: %TARGET%
pause
exit /b 1

:nocode
echo VS Code was not found at: %VSCODE%
pause
exit /b 1
