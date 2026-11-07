#!/usr/bin/env bash
# 소재 2 · 3 을 싱글 · 서브 · 팀으로 각각 RUNS 번 돌린다 (claude -p · stream-json 기록 · 벽시계 시간)
# 사용: bash run_all.sh <작업폴더> [RUNS=2] [소재들="3 2"]
W="$1"; RUNS="${2:-2}"; SC="${3:-3 2}"
HERE="$(cd "$(dirname "$0")" && pwd)"
for s in $SC; do
  for m in single sub team; do
    for r in $(seq 1 "$RUNS"); do
      d="$W/s$s/$m/run$r"; rm -rf "$d"; mkdir -p "$d/답변" "$d/결과"; cp -r "$HERE/소재$s/." "$d/"; rm -f "$d/check.js" "$d/정답.json"
      (
        cd "$d" || exit
        t0=$(date +%s)
        CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 timeout 1500 claude -p "$(cat "$HERE/prompts/s${s}_${m}.txt")" \
          --permission-mode acceptEdits --allowedTools "Bash(node:*)" "PowerShell(node:*)" --output-format stream-json --verbose < /dev/null > stream.jsonl 2> err.txt
        echo $(( $(date +%s) - t0 )) > wall.txt
      ) &
    done
  done
  wait
  echo "소재$s 끝 $(date +%H:%M:%S)"
done
