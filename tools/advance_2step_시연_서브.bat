@echo off
REM ---------------------------------------------------------------
REM  advance 2step instructor demo : sub
REM  Windows Terminal split view (like tmux):
REM   left  = main Claude running "/adv2-demo sub"
REM   right = one pane per agent, live from Claude Code agent logs
REM           (adv2_demo\pane.js reads ~/.claude/projects/.../subagents)
REM  Skill = test\AX_study\.claude\skills\adv2-demo
REM ---------------------------------------------------------------
set "TARGET=C:\Users\User\Desktop\test\AX_study\advance\2step\adv2_demo\cs_practice"
if not exist "%TARGET%\" goto :nofolder
where wt >nul 2>nul || goto :nowt
start "" wt -M -d "%TARGET%" --title main cmd /k claude "/adv2-demo sub" ; split-pane -V -s 0.45 -d "%TARGET%" --title cs-reply node ..\pane.js cs-reply type:cs-reply blue ; split-pane -H -s 0.5 -d "%TARGET%" --title checker node ..\pane.js checker type:general-purpose magenta ; move-focus left
exit /b 0

:nofolder
echo Demo folder not found: %TARGET%
pause
exit /b 1

:nowt
echo Windows Terminal (wt) was not found. Install it from Microsoft Store.
pause
exit /b 1
