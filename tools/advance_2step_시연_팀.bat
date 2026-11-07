@echo off
REM ---------------------------------------------------------------
REM  advance 2step instructor demo : team
REM  Demo folder = test\AX_study\advance\2step\adv2_demo\cs_practice
REM  Skill = test\AX_study\.claude\skills\adv2-demo
REM  Opens a new console in the demo folder and runs
REM  claude "/adv2-demo team" directly (no VS Code task, no Git Bash).
REM ---------------------------------------------------------------
set "TARGET=C:\Users\User\Desktop\test\AX_study\advance\2step\adv2_demo\cs_practice"
set "CLAUDE=C:\Users\User\.local\bin\claude.exe"
if not exist "%TARGET%\" goto :nofolder
if not exist "%CLAUDE%" set "CLAUDE=claude"
start "adv2 demo team" /max /d "%TARGET%" cmd /k ""%CLAUDE%" "/adv2-demo team""
exit /b 0

:nofolder
echo Demo folder not found: %TARGET%
pause
exit /b 1
