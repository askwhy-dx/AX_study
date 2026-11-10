#!/bin/bash
S="C:/Users/User/AppData/Local/Temp/claude/28f8a21682116076/82b6af6d-050f-4e52-a821-97caec4ad1dd/scratchpad/m1"
W="$S/ws"; L="$S/logs"
for spec in "$@"; do
  IFS=: read n d c <<< "$spec"
  case $d in cs2) D="$S/ws2/cs_practice";; cs) D="$W/cs_practice";; off) D="$W/cs_off";; ws) D="$W";; esac
  C=""; [ "$c" = c ] && C="-c"
  t0=$(date +%s)
  (cd "$D" && claude -p $C --permission-mode acceptEdits --allowedTools "Read,Write,Edit,Glob,Grep,Bash,PowerShell,Agent" < "$S/p/$n.txt") > "$L/$n.txt" 2>&1
  rc=$?; echo "$n $(( $(date +%s)-t0 ))s rc=$rc" >> "$L/_times.txt"
done
