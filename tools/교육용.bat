@echo off
REM ---------------------------------------------------------------
REM  Open a clean VS Code window for the Claude Code training demo.
REM  Target folder : C:\Users\User\Desktop\claude_work
REM
REM  Keep this file ASCII only.
REM  Korean text inside a .bat breaks on codepage 949 consoles.
REM ---------------------------------------------------------------

set "TARGET=C:\Users\User\Desktop\claude_work"
set "VSCODE=C:\Users\User\AppData\Local\Programs\Microsoft VS Code\Code.exe"

if not exist "%TARGET%" mkdir "%TARGET%"

if not exist "%VSCODE%" goto :nocode

REM -n = new window, so the window you are working in stays untouched.
start "" "%VSCODE%" -n "%TARGET%"
exit /b 0

:nocode
echo.
echo VS Code was not found at:
echo   %VSCODE%
echo.
echo Fix the VSCODE line in this file, then run again.
echo.
pause
