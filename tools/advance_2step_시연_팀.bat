@echo off
REM ---------------------------------------------------------------
REM  advance 2step instructor demo : team
REM  Windows Terminal split view (like tmux):
REM   left  = main Claude running "/adv2-demo team"
REM   right = one pane per agent, live from Claude Code agent logs
REM           (adv2_demo\pane.js reads ~/.claude/projects/.../subagents)
REM  Skill = test\AX_study\.claude\skills\adv2-demo
REM ---------------------------------------------------------------
set "TARGET=C:\Users\User\Desktop\test\AX_study\advance\2step\adv2_demo\cs_practice"
if not exist "%TARGET%\" goto :nofolder
where wt >nul 2>nul || goto :nowt
start "" wt -M -d "%TARGET%" --title main cmd /k claude "/adv2-demo team" ; split-pane -V -s 0.45 -d "%TARGET%" --title replier node ..\pane.js replier name:replier blue ; split-pane -H -s 0.67 -d "%TARGET%" --title policy node ..\pane.js policy name:policy green ; split-pane -H -s 0.5 -d "%TARGET%" --title parent node ..\pane.js parent name:parent yellow ; move-focus left
exit /b 0

:nofolder
echo Demo folder not found: %TARGET%
pause
exit /b 1

:nowt
echo Windows Terminal (wt) was not found. Install it from Microsoft Store.
pause
exit /b 1
